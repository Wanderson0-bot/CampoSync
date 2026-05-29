import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs/promises';
import { db, initDatabase } from '../src/config/database.js';
import { env } from '../src/config/env.js';
import {
  syncOutboundInventoryAfterCreate,
  syncOutboundInventoryAfterDelete,
  syncPurchaseInventoryAfterCreate
} from '../src/lib/inventory.js';

const emptyState = {
  notifications: [],
  auditLogs: [],
  purchases: [],
  consumptions: [],
  sales: [],
  supplies: [],
  materials: [],
    actions: [],
    dailyUnitActivities: [],
    customUnits: [],
  locations: [],
  lifecycleAnimals: [],
  lifecycleEvents: [],
  lifecycleDeaths: [],
  users: [],
  counters: {
    notifications: 1,
    auditLogs: 1,
    purchases: 1,
    consumptions: 1,
    sales: 1,
    supplies: 1,
    materials: 1,
    actions: 1,
    dailyUnitActivities: 1,
    customUnits: 1,
    locations: 1,
    lifecycleAnimals: 1,
    lifecycleEvents: 1,
    lifecycleDeaths: 1,
    users: 1
  }
};

async function getSupply(product, domain) {
  const items = await db.list('supplies');
  return items.find((item) => item.product === product && item.domain === domain) || null;
}

test('movimentacoes de estoque atualizam suprimentos automaticamente', async () => {
  await fs.writeFile(env.dataFile, JSON.stringify(emptyState, null, 2), 'utf8');
  await initDatabase();

  const supply = await db.create('supplies', {
    product: 'Racao para peixe',
    domain: 'piscicultura',
    stock: 1,
    minStock: 1,
    createdAt: '2026-05-16',
    unitPrice: 10,
    notes: '',
    updatedAt: new Date().toISOString(),
    updatedBy: 'estoque@camposync.app',
    createdBy: 'estoque@camposync.app'
  });

  assert.equal(supply.stock, 1);

  await syncPurchaseInventoryAfterCreate({
    item: 'Racao para peixe',
    category: 'piscicultura',
    quantity: 2,
    minStock: 1,
    unitPrice: 10,
    notes: '',
    date: '2026-05-16'
  }, 'compras@camposync.app');

  const afterPurchase = await getSupply('Racao para peixe', 'piscicultura');
  assert.equal(afterPurchase?.stock, 3);

  await syncOutboundInventoryAfterCreate({
    produto: 'Racao para peixe',
    categoria: 'piscicultura',
    quantidade: 1,
    data_venda: '2026-05-16'
  }, 'vendas@camposync.app', 'quantidade', 'produto', 'categoria', 'data_venda');

  const afterSale = await getSupply('Racao para peixe', 'piscicultura');
  assert.equal(afterSale?.stock, 2);

  await syncOutboundInventoryAfterCreate({
    produto: 'Racao para peixe',
    categoria: 'piscicultura',
    quantidade: 1,
    data_consumo: '2026-05-16'
  }, 'consumos@camposync.app', 'quantidade', 'produto', 'categoria', 'data_consumo');

  const afterConsumption = await getSupply('Racao para peixe', 'piscicultura');
  assert.equal(afterConsumption?.stock, 1);

  await syncOutboundInventoryAfterDelete({
    produto: 'Racao para peixe',
    categoria: 'piscicultura',
    quantidade: 1
  }, 'consumos@camposync.app', 'quantidade', 'produto', 'categoria');

  const afterDelete = await getSupply('Racao para peixe', 'piscicultura');
  assert.equal(afterDelete?.stock, 2);

  const notifications = await db.list('notifications');
  assert.equal(env.auditLogRetentionDays, 90);
  assert.ok(notifications.some((item) => String(item.title).includes('Entrada no estoque')));
  assert.ok(notifications.some((item) => String(item.title).includes('Estoque critico')));
});
