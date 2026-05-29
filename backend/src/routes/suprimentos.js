import { createCollectionRouter } from './_collection.js';
import { optionalNumber, optionalString, requireDate, requireNumber, requireString } from '../lib/validators.js';
import { ensureLowStockNotification, isLowStock } from '../lib/inventory.js';

function normalizeSupply(body, user, current = {}) {
  const stock = requireNumber(body?.stock ?? current.stock, 'stock', { min: 1 });
  const minStock = requireNumber(body?.minStock ?? current.minStock, 'minStock', { min: 0 });

  return {
    product: requireString(body?.product ?? current.product, 'product'),
    domain: requireString(body?.domain ?? current.domain, 'domain'),
    stock,
    minStock,
    createdAt: body?.createdAt ? requireDate(body.createdAt, 'createdAt') : current.createdAt || new Date().toISOString().slice(0, 10),
    unitPrice: optionalNumber(body?.unitPrice ?? current.unitPrice, { min: 0, fallback: 0 }),
    notes: optionalString(body?.notes ?? current.notes, { max: 400 }),
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'supplies',
  validateCreate: (body, user) => normalizeSupply(body, user),
  validateUpdate: (body, user, current) => normalizeSupply(body, user, current),
  afterCreate: ensureLowStockNotification,
  afterUpdate: async (updated, current) => {
    if (!isLowStock(current) && isLowStock(updated)) {
      await ensureLowStockNotification(updated);
    }
  }
});
