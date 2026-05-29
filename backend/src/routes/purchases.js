import { createCollectionRouter } from './_collection.js';
import { optionalNumber, optionalString, requireDate, requireNumber, requireString } from '../lib/validators.js';
import {
  syncPurchaseInventoryAfterCreate,
  syncPurchaseInventoryAfterDelete,
  syncPurchaseInventoryAfterUpdate
} from '../lib/inventory.js';

function normalizePurchase(body, user, current = {}) {
  return {
    item: requireString(body?.item ?? current.item, 'item'),
    category: requireString(body?.category ?? current.category, 'category'),
    date: requireDate(body?.date ?? current.date, 'date'),
    quantity: requireNumber(body?.quantity ?? current.quantity, 'quantity', { min: 1 }),
    unitPrice: requireNumber(body?.unitPrice ?? current.unitPrice, 'unitPrice', { min: 0 }),
    stock: requireNumber(body?.stock ?? current.stock, 'stock', { min: 0 }),
    minStock: requireNumber(body?.minStock ?? current.minStock, 'minStock', { min: 0 }),
    notes: optionalString(body?.notes ?? current.notes, { max: 400 }),
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'purchases',
  allowPublicRead: false,
  validateCreate: (body, user) => normalizePurchase(body, user),
  validateUpdate: (body, user, current) => normalizePurchase(body, user, current),
  afterCreate: (created, req) => syncPurchaseInventoryAfterCreate(created, req.user.email),
  afterUpdate: (updated, current, req) => syncPurchaseInventoryAfterUpdate(current, updated, req.user.email),
  afterDelete: (removed, req) => syncPurchaseInventoryAfterDelete(removed, req.user.email)
});
