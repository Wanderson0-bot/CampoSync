import { createCollectionRouter } from './_collection.js';
import { db } from '../config/database.js';
import {
  optionalNumber,
  optionalString,
  requireDate,
  requireNumber,
  requireString
} from '../lib/validators.js';
import {
  syncOutboundInventoryAfterCreate,
  syncOutboundInventoryAfterDelete,
  syncOutboundInventoryAfterUpdate
} from '../lib/inventory.js';

async function findSupplyByConsumption(product, category) {
  const normalizedProduct = String(product || '').trim().toLowerCase();
  const normalizedCategory = String(category || '').trim().toLowerCase();

  return db.findOne('supplies', (item) => (
    String(item.product || '').trim().toLowerCase() === normalizedProduct &&
    String(item.domain || '').trim().toLowerCase() === normalizedCategory
  ));
}

async function normalizeConsumption(body, user, current = {}) {
  const produto = requireString(body?.produto ?? current.produto, 'produto', {
    max: 160
  });
  const categoria = requireString(body?.categoria ?? current.categoria, 'categoria', {
    max: 120
  });
  const quantidade = requireNumber(
    body?.quantidade ?? current.quantidade,
    'quantidade',
    { min: 1 }
  );
  const supply = await findSupplyByConsumption(produto, categoria);
  const nextStock = supply
    ? Math.max(0, Number(supply.stock || 0) - quantidade)
    : optionalNumber(body?.stock ?? current.stock, { min: 0, fallback: 0 });

  return {
    produto,
    categoria,
    data_consumo: requireDate(
      body?.data_consumo ?? current.data_consumo,
      'data_consumo'
    ),
    quantidade,
    stock: nextStock,
    estimatedCost: optionalNumber(
      body?.estimatedCost ?? (
        supply?.unitPrice != null
          ? Number(supply.unitPrice || 0) * quantidade
          : current.estimatedCost
      ),
      { min: 0, fallback: 0 }
    ),
    observacoes: optionalString(body?.observacoes ?? current.observacoes, {
      max: 600
    }),
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'consumptions',
  allowPublicRead: false,
  validateCreate: (body, user) => normalizeConsumption(body, user),
  validateUpdate: (body, user, current) =>
    normalizeConsumption(body, user, current),
  afterCreate: (created, req) => syncOutboundInventoryAfterCreate(created, req.user.email, 'quantidade', 'produto', 'categoria', 'data_consumo'),
  afterUpdate: (updated, current, req) => syncOutboundInventoryAfterUpdate(current, updated, req.user.email, 'quantidade', 'produto', 'categoria', 'data_consumo'),
  afterDelete: (removed, req) => syncOutboundInventoryAfterDelete(removed, req.user.email, 'quantidade', 'produto', 'categoria')
});
