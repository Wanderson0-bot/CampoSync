import { createCollectionRouter } from './_collection.js';
import { AppError } from '../lib/errors.js';
import { optionalString, requireDate, requireNumber, requireString } from '../lib/validators.js';
import {
  findSupplyByProductAndDomain,
  syncOutboundInventoryAfterCreate,
  syncOutboundInventoryAfterDelete,
  syncOutboundInventoryAfterUpdate
} from '../lib/inventory.js';

function normalizeSale(body, user, current = {}) {
  return {
    produto: requireString(body?.produto ?? current.produto, 'produto', { max: 120 }),
    categoria: requireString(body?.categoria ?? current.categoria, 'categoria'),
    quantidade: requireNumber(body?.quantidade ?? current.quantidade, 'quantidade', { min: 1 }),
    valor_unitario: requireNumber(body?.valor_unitario ?? current.valor_unitario, 'valor_unitario', { min: 0 }),
    data_venda: requireDate(body?.data_venda ?? current.data_venda, 'data_venda'),
    cliente: optionalString(body?.cliente ?? current.cliente, { max: 120 }),
    observacoes: optionalString(body?.observacoes ?? current.observacoes, { max: 600 }),
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

async function ensureSaleStockAvailability(payload, current = null) {
  const supply = await findSupplyByProductAndDomain(payload.produto, payload.categoria);

  if (!supply) {
    throw new AppError(
      400,
      `O suprimento ${payload.produto} da categoria ${payload.categoria} nao foi encontrado no estoque.`
    );
  }

  const isSameSupply =
    current &&
    String(current.produto || '').trim().toLowerCase() === String(payload.produto || '').trim().toLowerCase() &&
    String(current.categoria || '').trim().toLowerCase() === String(payload.categoria || '').trim().toLowerCase();

  const availableStock = Number(supply.stock || 0) + (isSameSupply ? Number(current.quantidade || 0) : 0);

  if (Number(payload.quantidade) > availableStock) {
    throw new AppError(
      400,
      `Estoque insuficiente para ${payload.produto}. Disponivel: ${availableStock}. Solicitado: ${payload.quantidade}.`
    );
  }

  return payload;
}

export default createCollectionRouter({
  collection: 'sales',
  allowPublicRead: false,
  validateCreate: async (body, user) => ensureSaleStockAvailability(normalizeSale(body, user)),
  validateUpdate: async (body, user, current) => ensureSaleStockAvailability(normalizeSale(body, user, current), current),
  afterCreate: (created, req) => syncOutboundInventoryAfterCreate(created, req.user.email, 'quantidade', 'produto', 'categoria', 'data_venda'),
  afterUpdate: (updated, current, req) => syncOutboundInventoryAfterUpdate(current, updated, req.user.email, 'quantidade', 'produto', 'categoria', 'data_venda'),
  afterDelete: (removed, req) => syncOutboundInventoryAfterDelete(removed, req.user.email, 'quantidade', 'produto', 'categoria')
});
