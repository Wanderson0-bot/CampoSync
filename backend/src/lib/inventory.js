import { db } from '../config/database.js';
import { AppError } from './errors.js';

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function formatDateParts(value = new Date().toISOString()) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const fallback = new Date();
    return {
      date: fallback.toISOString().slice(0, 10),
      time: fallback.toISOString().slice(11, 16)
    };
  }

  return {
    date: date.toISOString().slice(0, 10),
    time: date.toISOString().slice(11, 16)
  };
}

export async function findSupplyByProductAndDomain(product, domain) {
  const normalizedProduct = normalizeText(product);
  const normalizedDomain = normalizeText(domain);
  const supplies = await db.list('supplies');

  return supplies.find((item) => (
    normalizeText(item.product) === normalizedProduct &&
    normalizeText(item.domain) === normalizedDomain
  )) || null;
}

export function isLowStock(supply) {
  return Number(supply?.stock || 0) <= Number(supply?.minStock || 0);
}

export async function createNotification({ title, message, occurredAt, read = false }) {
  const { time } = formatDateParts(occurredAt);
  return db.create('notifications', {
    title: String(title || '').trim(),
    message: String(message || '').trim(),
    time,
    read: Boolean(read)
  });
}

export async function ensureLowStockNotification(supply) {
  if (!isLowStock(supply)) {
    return null;
  }

  const title = `Estoque critico: ${supply.product}`;
  const message = `${supply.product} esta com ${supply.stock} unidade(s) em estoque. Minimo recomendado: ${supply.minStock}.`;
  const notifications = await db.list('notifications');
  const alreadyOpen = notifications.some((notification) => (
    !notification.read &&
    notification.title === title &&
    notification.message === message
  ));

  if (alreadyOpen) {
    return null;
  }

  return createNotification({
    title,
    message,
    occurredAt: supply.updatedAt || new Date().toISOString()
  });
}

export async function createStockEntryNotification({
  product,
  domain,
  quantity,
  stock,
  userEmail,
  occurredAt
}) {
  const { date, time } = formatDateParts(occurredAt);
  return createNotification({
    title: `Entrada no estoque: ${product}`,
    message:
      `${quantity} unidade(s) de ${product} foram adicionadas em ${domain}. ` +
      `Data: ${date}. Hora: ${time}. Usuario: ${userEmail}. Estoque atual: ${stock}.`,
    occurredAt
  });
}

export async function applySupplyDelta({
  product,
  domain,
  quantityDelta,
  minStock,
  unitPrice,
  notes,
  userEmail,
  occurredAt,
  allowCreate = false
}) {
  const quantity = Number(quantityDelta);
  if (!Number.isFinite(quantity) || quantity === 0) {
    return null;
  }

  const normalizedProduct = String(product || '').trim();
  const normalizedDomain = String(domain || '').trim();
  if (!normalizedProduct || !normalizedDomain) {
    throw new AppError(400, 'Produto e categoria sao obrigatorios para movimentar estoque.');
  }

  const existing = await findSupplyByProductAndDomain(normalizedProduct, normalizedDomain);
  const nowIso = new Date().toISOString();

  if (!existing) {
    if (!allowCreate || quantity < 0) {
      throw new AppError(
        400,
        `O suprimento ${normalizedProduct} da categoria ${normalizedDomain} nao foi encontrado no estoque.`
      );
    }

    const created = await db.create('supplies', {
      product: normalizedProduct,
      domain: normalizedDomain,
      stock: quantity,
      minStock: Math.max(0, Number(minStock) || 0),
      createdAt: nowIso.slice(0, 10),
      unitPrice: Math.max(0, Number(unitPrice) || 0),
      notes: String(notes || '').trim(),
      updatedAt: nowIso,
      updatedBy: userEmail,
      createdBy: userEmail
    });

    return created;
  }

  const nextStock = Number(existing.stock || 0) + quantity;
  if (nextStock < 0) {
    throw new AppError(
      400,
      `Estoque insuficiente para ${normalizedProduct}. Disponivel: ${existing.stock}. Solicitado: ${Math.abs(quantity)}.`
    );
  }

  const resolvedMinStock = Number(existing.minStock || 0) > 0
    ? Number(existing.minStock || 0)
    : Math.max(0, Number(minStock) || 0);

  const updated = await db.update('supplies', existing.id, (current) => ({
    ...current,
    stock: nextStock,
    minStock: resolvedMinStock,
    unitPrice: Number(unitPrice) >= 0 ? Number(unitPrice) : Number(current.unitPrice || 0),
    notes: String(notes || current.notes || '').trim(),
    updatedAt: nowIso,
    updatedBy: userEmail
  }));

  return updated;
}

export async function syncPurchaseInventoryAfterCreate(purchase, userEmail) {
  const updatedSupply = await applySupplyDelta({
    product: purchase.item,
    domain: purchase.category,
    quantityDelta: Number(purchase.quantity),
    minStock: purchase.minStock,
    unitPrice: purchase.unitPrice,
    notes: purchase.notes,
    userEmail,
    occurredAt: purchase.date,
    allowCreate: true
  });

  if (updatedSupply) {
    await createStockEntryNotification({
      product: updatedSupply.product,
      domain: updatedSupply.domain,
      quantity: Number(purchase.quantity),
      stock: updatedSupply.stock,
      userEmail,
      occurredAt: purchase.date
    });
    await ensureLowStockNotification(updatedSupply);
  }

  return updatedSupply;
}

export async function syncPurchaseInventoryAfterUpdate(current, updated, userEmail) {
  await applySupplyDelta({
    product: current.item,
    domain: current.category,
    quantityDelta: -Number(current.quantity),
    minStock: current.minStock,
    unitPrice: current.unitPrice,
    notes: current.notes,
    userEmail
  });

  return syncPurchaseInventoryAfterCreate(updated, userEmail);
}

export async function syncPurchaseInventoryAfterDelete(purchase, userEmail) {
  return applySupplyDelta({
    product: purchase.item,
    domain: purchase.category,
    quantityDelta: -Number(purchase.quantity),
    minStock: purchase.minStock,
    unitPrice: purchase.unitPrice,
    notes: purchase.notes,
    userEmail
  });
}

export async function syncOutboundInventoryAfterCreate(record, userEmail, quantityField, productField, domainField, dateField) {
  const updatedSupply = await applySupplyDelta({
    product: record[productField],
    domain: record[domainField],
    quantityDelta: -Number(record[quantityField]),
    userEmail,
    occurredAt: record[dateField]
  });

  if (updatedSupply) {
    await ensureLowStockNotification(updatedSupply);
  }

  return updatedSupply;
}

export async function syncOutboundInventoryAfterUpdate(current, updated, userEmail, quantityField, productField, domainField, dateField) {
  await applySupplyDelta({
    product: current[productField],
    domain: current[domainField],
    quantityDelta: Number(current[quantityField]),
    userEmail
  });

  return syncOutboundInventoryAfterCreate(updated, userEmail, quantityField, productField, domainField, dateField);
}

export async function syncOutboundInventoryAfterDelete(record, userEmail, quantityField, productField, domainField) {
  return applySupplyDelta({
    product: record[productField],
    domain: record[domainField],
    quantityDelta: Number(record[quantityField]),
    userEmail
  });
}
