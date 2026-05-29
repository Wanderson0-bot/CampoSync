import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs/promises';
import { env } from '../src/config/env.js';
import { db, initDatabase } from '../src/config/database.js';
import { processDueActionNotifications } from '../src/lib/action-notifications.js';

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

test('gera notificacao quando a acao chega na data e hora programadas', async () => {
  await fs.writeFile(env.dataFile, JSON.stringify(emptyState, null, 2), 'utf8');
  await initDatabase();

  const dueDate = new Date(Date.now() - 60_000);
  const action = await db.create('actions', {
    acao: 'Vacinação do lote',
    unidade: 'avicultura',
    performerName: 'Maria Silva',
    data_acao: dueDate.toISOString().slice(0, 10),
    hora_acao: dueDate.toISOString().slice(11, 16),
    detalhes_acao: 'Aplicar reforço sanitário.',
    notificationSentAt: '',
    updatedAt: new Date().toISOString(),
    updatedBy: 'teste@camposync.app',
    createdAt: new Date().toISOString(),
    createdBy: 'teste@camposync.app'
  });

  await processDueActionNotifications();

  const notifications = await db.list('notifications');
  const updatedAction = await db.getById('actions', action.id);

  assert.equal(notifications.length, 1);
  assert.match(notifications[0].title, /Ação programada/);
  assert.match(notifications[0].message, /Maria Silva/);
  assert.ok(updatedAction?.notificationSentAt);
});
