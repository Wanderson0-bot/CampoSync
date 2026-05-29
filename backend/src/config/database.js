import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';
import { defaultData } from '../constants/default-data.js';
import { env } from './env.js';
import { ensureDefaultUnits } from '../routes/units.js';

let state = null;
let writeQueue = Promise.resolve();
let sqlPool = null;
let auditLogCleanupTimer = null;
let auditLogCleanupPromise = Promise.resolve(0);

const COLLECTIONS = Object.keys(defaultData).filter((key) => key !== 'counters');

const SQL_COLLECTION_TABLES = {
  users: { table: 'usuarios', idColumn: 'id_usuario' },
  notifications: { table: 'cs_notifications', idColumn: 'id' },
  auditLogs: { table: 'cs_auditlogs', idColumn: 'id' },
  purchases: { table: 'compras', idColumn: 'id' },
  consumptions: { table: 'consumos', idColumn: 'id' },
  sales: { table: 'vendas', idColumn: 'id_venda' },
  supplies: { table: 'produtos', idColumn: 'id_produto' },
  materials: { table: 'materiais', idColumn: 'id_material' },
  actions: { table: 'acoes', idColumn: 'id_acao' },
  dailyUnitActivities: { table: 'cs_daily_unit_activities', idColumn: 'id' },
  customUnits: { table: 'cadastrar_areas_produtivas', idColumn: 'id' },
  locations: { table: 'areas_produtivas', idColumn: 'id_area_produtiva' },
  lifecycleAnimals: { table: 'cs_lifecycle_animals', idColumn: 'id' },
  lifecycleEvents: { table: 'cs_lifecycle_events', idColumn: 'id' },
  lifecycleDeaths: { table: 'cs_lifecycle_deaths', idColumn: 'id' }
};

const SQL_COLLECTION_SCHEMAS = {
  users: {
    name: { column: 'name', type: 'VARCHAR(120)' },
    legacyName: { column: 'nome', type: 'VARCHAR(120)', source: 'name', target: 'name', fallback: '' },
    email: { column: 'email', type: 'VARCHAR(190)' },
    avatarUrl: { column: 'avatar_data_url', type: 'LONGTEXT' },
    passwordHash: { column: 'password_hash', type: 'TEXT' },
    legacyPassword: { column: 'senha', type: 'VARCHAR(255)', source: 'passwordHash', target: 'passwordHash', fallback: '' },
    googleId: { column: 'google_id', type: 'VARCHAR(255)' },
    authProvider: { column: 'auth_provider', type: 'VARCHAR(40)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    resetPasswordTokenHash: { column: 'reset_password_token_hash', type: 'VARCHAR(128)' },
    resetPasswordExpiresAt: { column: 'reset_password_expires_at', type: 'VARCHAR(40)' }
  },
  notifications: {
    title: { column: 'title', type: 'VARCHAR(160)' },
    message: { column: 'message', type: 'TEXT' },
    time: { column: 'time_label', type: 'VARCHAR(16)' },
    read: { column: 'is_read', type: 'TINYINT(1)', kind: 'boolean' }
  },
  auditLogs: {
    type: { column: 'event_type', type: 'VARCHAR(80)' },
    title: { column: 'title', type: 'VARCHAR(200)' },
    details: { column: 'details', type: 'TEXT' },
    area: { column: 'area_name', type: 'VARCHAR(160)' },
    status: { column: 'status_name', type: 'VARCHAR(80)' },
    date: { column: 'event_date', type: 'VARCHAR(20)' },
    time: { column: 'event_time', type: 'VARCHAR(10)' },
    user: { column: 'user_email', type: 'VARCHAR(190)' },
    source: { column: 'source_name', type: 'VARCHAR(80)' },
    entityType: { column: 'entity_type', type: 'VARCHAR(80)' },
    entityId: { column: 'entity_id', type: 'VARCHAR(80)' },
    metadata: { column: 'metadata_json', type: 'JSON', kind: 'json' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  purchases: {
    item: { column: 'item', type: 'VARCHAR(160)' },
    category: { column: 'category', type: 'VARCHAR(120)' },
    date: { column: 'purchase_date', type: 'VARCHAR(20)', kind: 'date' },
    quantity: { column: 'quantity', type: 'DOUBLE', kind: 'number' },
    unitPrice: { column: 'unit_price', type: 'DOUBLE', kind: 'number' },
    stock: { column: 'stock', type: 'DOUBLE', kind: 'number' },
    minStock: { column: 'min_stock', type: 'DOUBLE', kind: 'number' },
    notes: { column: 'notes', type: 'TEXT' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  consumptions: {
    produto: { column: 'produto', type: 'VARCHAR(160)' },
    categoria: { column: 'categoria', type: 'VARCHAR(120)' },
    data_consumo: { column: 'data_consumo', type: 'VARCHAR(20)', kind: 'date' },
    quantidade: { column: 'quantidade', type: 'DOUBLE', kind: 'number' },
    stock: { column: 'stock', type: 'DOUBLE', kind: 'number' },
    minStock: { column: 'min_stock', type: 'DOUBLE', kind: 'number' },
    estimatedCost: { column: 'estimated_cost', type: 'DOUBLE', kind: 'number' },
    observacoes: { column: 'observacoes', type: 'TEXT' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  sales: {
    produto: { column: 'produto', type: 'VARCHAR(160)' },
    categoria: { column: 'categoria', type: 'VARCHAR(120)' },
    quantidade: { column: 'quantidade', type: 'DOUBLE', kind: 'number' },
    valor_unitario: { column: 'valor_unitario', type: 'DOUBLE', kind: 'number' },
    data_venda: { column: 'data_venda', type: 'VARCHAR(20)', kind: 'date' },
    cliente: { column: 'cliente', type: 'VARCHAR(160)' },
    observacoes: { column: 'observacoes', type: 'TEXT' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  supplies: {
    product: { column: 'product', type: 'VARCHAR(160)' },
    legacyProductName: { column: 'nome', type: 'VARCHAR(160)', source: 'product', target: 'product', fallback: '' },
    domain: { column: 'domain_name', type: 'VARCHAR(120)' },
    stock: { column: 'stock', type: 'DOUBLE', kind: 'number' },
    minStock: { column: 'min_stock', type: 'DOUBLE', kind: 'number' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    unitPrice: { column: 'unit_price', type: 'DOUBLE', kind: 'number' },
    notes: { column: 'notes', type: 'TEXT' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  materials: {
    material: { column: 'material', type: 'VARCHAR(160)' },
    categoria: { column: 'categoria', type: 'VARCHAR(120)' },
    quantidade: { column: 'quantidade', type: 'DOUBLE', kind: 'number' },
    status: { column: 'status_name', type: 'VARCHAR(80)' },
    legacyStatus: { column: 'status_', type: 'VARCHAR(80)', source: 'status', target: 'status' },
    dominio: { column: 'dominio', type: 'VARCHAR(120)' },
    ultima_inspecao: { column: 'ultima_inspecao', type: 'VARCHAR(20)', kind: 'date' },
    observacoes: { column: 'observacoes', type: 'TEXT' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  actions: {
    acao: { column: 'acao', type: 'VARCHAR(160)' },
    legacyTitle: { column: 'titulo', type: 'VARCHAR(255)', source: 'acao', target: 'acao', fallback: '' },
    unidade: { column: 'unidade', type: 'VARCHAR(160)' },
    performerName: { column: 'performer_name', type: 'VARCHAR(190)' },
    data_acao: { column: 'data_acao', type: 'VARCHAR(20)', kind: 'date' },
    hora_acao: { column: 'hora_acao', type: 'VARCHAR(10)', kind: 'time' },
    detalhes_acao: { column: 'detalhes_acao', type: 'TEXT' },
    legacyDetails: { column: 'descricao', type: 'TEXT', source: 'detalhes_acao', target: 'detalhes_acao' },
    notificationSentAt: { column: 'notification_sent_at_iso', type: 'VARCHAR(40)' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  dailyUnitActivities: {
    unitId: { column: 'unit_id', type: 'VARCHAR(80)' },
    unitSlug: { column: 'unit_slug', type: 'VARCHAR(120)' },
    unitName: { column: 'unit_name', type: 'VARCHAR(190)' },
    category: { column: 'category_name', type: 'VARCHAR(60)' },
    performerName: { column: 'performer_name', type: 'VARCHAR(190)' },
    title: { column: 'title', type: 'VARCHAR(160)' },
    details: { column: 'details', type: 'TEXT' },
    activityDate: { column: 'activity_date', type: 'VARCHAR(20)', kind: 'date' },
    activityTime: { column: 'activity_time', type: 'VARCHAR(10)' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  customUnits: {
    name: { column: 'name', type: 'VARCHAR(160)' },
    nome: { column: 'nome', type: 'VARCHAR(160)' },
    slug: { column: 'slug', type: 'VARCHAR(120)' },
    pageSlug: { column: 'page_slug', type: 'VARCHAR(120)' },
    category: { column: 'category', type: 'VARCHAR(60)' },
    categoria: { column: 'categoria', type: 'VARCHAR(60)' },
    tipo: { column: 'tipo', type: 'VARCHAR(60)' },
    lifecycleEnabled: { column: 'lifecycle_enabled', type: 'TINYINT(1)', kind: 'boolean' },
    image: { column: 'image_path', type: 'LONGTEXT' },
    descricao: { column: 'descricao', type: 'TEXT' },
    responsavel: { column: 'responsavel', type: 'VARCHAR(190)' },
    lat: { column: 'lat', type: 'DOUBLE', kind: 'number' },
    lng: { column: 'lng', type: 'DOUBLE', kind: 'number' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' },
    isDefault: { column: 'is_default', type: 'TINYINT(1)', kind: 'boolean' }
  },
  locations: {
    nome: { column: 'nome', type: 'VARCHAR(160)' },
    status: { column: 'status_name', type: 'VARCHAR(60)' },
    lat: { column: 'lat', type: 'DOUBLE', kind: 'number' },
    lng: { column: 'lng', type: 'DOUBLE', kind: 'number' },
    latitude: { column: 'latitude', type: 'DOUBLE', kind: 'number' },
    longitude: { column: 'longitude', type: 'DOUBLE', kind: 'number' },
    coors: { column: 'coors_json', type: 'JSON', kind: 'json' },
    coords: { column: 'coords_json', type: 'JSON', kind: 'json' }
  },
  lifecycleAnimals: {
    unitId: { column: 'unit_id', type: 'VARCHAR(80)' },
    unitSlug: { column: 'unit_slug', type: 'VARCHAR(120)' },
    unitName: { column: 'unit_name', type: 'VARCHAR(190)' },
    category: { column: 'category_name', type: 'VARCHAR(60)' },
    codigo_animal: { column: 'codigo_animal', type: 'VARCHAR(120)' },
    data_nascimento: { column: 'data_nascimento', type: 'VARCHAR(20)', kind: 'date' },
    codigo_mae: { column: 'codigo_mae', type: 'VARCHAR(120)' },
    codigo_pai: { column: 'codigo_pai', type: 'VARCHAR(120)' },
    raca: { column: 'raca', type: 'VARCHAR(160)' },
    sexo: { column: 'sexo', type: 'VARCHAR(60)' },
    fase: { column: 'fase', type: 'VARCHAR(120)' },
    baia: { column: 'baia', type: 'VARCHAR(160)' },
    status: { column: 'status_name', type: 'VARCHAR(80)' },
    observacoes: { column: 'observacoes', type: 'TEXT' },
    rawFields: { column: 'raw_fields_json', type: 'JSON', kind: 'json' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  lifecycleEvents: {
    unitId: { column: 'unit_id', type: 'VARCHAR(80)' },
    unitSlug: { column: 'unit_slug', type: 'VARCHAR(120)' },
    unitName: { column: 'unit_name', type: 'VARCHAR(190)' },
    category: { column: 'category_name', type: 'VARCHAR(60)' },
    animal_id: { column: 'animal_id_ref', type: 'BIGINT', kind: 'number' },
    animal_codigo: { column: 'animal_codigo', type: 'VARCHAR(120)' },
    data_evento: { column: 'data_evento', type: 'VARCHAR(20)', kind: 'date' },
    tipo_evento: { column: 'tipo_evento', type: 'VARCHAR(120)' },
    fase_vida: { column: 'fase_vida', type: 'VARCHAR(120)' },
    descricao_evento: { column: 'descricao_evento', type: 'TEXT' },
    rawFields: { column: 'raw_fields_json', type: 'JSON', kind: 'json' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  },
  lifecycleDeaths: {
    unitId: { column: 'unit_id', type: 'VARCHAR(80)' },
    unitSlug: { column: 'unit_slug', type: 'VARCHAR(120)' },
    unitName: { column: 'unit_name', type: 'VARCHAR(190)' },
    category: { column: 'category_name', type: 'VARCHAR(60)' },
    animal_id: { column: 'animal_id_ref', type: 'BIGINT', kind: 'number' },
    animal_codigo: { column: 'animal_codigo', type: 'VARCHAR(120)' },
    data_obito: { column: 'data_obito', type: 'VARCHAR(20)', kind: 'date' },
    causa_obito: { column: 'causa_obito', type: 'VARCHAR(160)' },
    categoria_causa: { column: 'categoria_causa', type: 'VARCHAR(120)' },
    observacoes_obito: { column: 'observacoes_obito', type: 'TEXT' },
    rawFields: { column: 'raw_fields_json', type: 'JSON', kind: 'json' },
    updatedAt: { column: 'updated_at_iso', type: 'VARCHAR(40)' },
    updatedBy: { column: 'updated_by', type: 'VARCHAR(190)' },
    createdAt: { column: 'created_at_iso', type: 'VARCHAR(40)' },
    createdBy: { column: 'created_by', type: 'VARCHAR(190)' }
  }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeRecord(record, fallbackId = null) {
  if (!record) return null;

  if (typeof record === 'string') {
    try {
      record = JSON.parse(record);
    } catch (error) {
      console.error('Erro ao converter JSON:', error);
      return null;
    }
  }

  const normalized = clone(record);

  if (normalized.id == null && fallbackId != null) {
    normalized.id = fallbackId;
  }

  return normalized;
}

function getJsonTableName(collection) {
  const config = SQL_COLLECTION_TABLES[collection];
  if (typeof config === 'string') {
    return config;
  }

  return config?.table || `cs_${String(collection).toLowerCase()}`;
}

function getIdColumn(collection) {
  const config = SQL_COLLECTION_TABLES[collection];
  if (typeof config === 'object' && config?.idColumn) {
    return config.idColumn;
  }

  return 'id';
}

function getCollectionSchema(collection) {
  return SQL_COLLECTION_SCHEMAS[collection] || {};
}

function escapeSqlIdentifier(identifier) {
  return `\`${String(identifier).replace(/`/g, '``')}\``;
}

function normalizeDateOnly(value) {
  if (value == null || value === '') {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  const rawValue = String(value);
  const match = rawValue.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : rawValue;
}

function normalizeTimeOnly(value) {
  if (value == null || value === '') {
    return null;
  }

  const rawValue = String(value).trim();
  const match = rawValue.match(/^(\d{2}:\d{2})/);
  return match ? match[1] : rawValue.slice(0, 5);
}

function serializeSchemaValue(fieldSchema, value) {
  if (value == null) {
    return null;
  }

  if (fieldSchema.kind === 'date') {
    return normalizeDateOnly(value);
  }

  if (fieldSchema.kind === 'boolean') {
    return value ? 1 : 0;
  }

  if (fieldSchema.kind === 'time') {
    return normalizeTimeOnly(value);
  }

  if (fieldSchema.kind === 'number') {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }

  if (fieldSchema.kind === 'json') {
    return JSON.stringify(value);
  }

  return value;
}

function deserializeSchemaValue(fieldSchema, value) {
  if (value == null) {
    return null;
  }

  if (fieldSchema.kind === 'date') {
    return normalizeDateOnly(value);
  }

  if (fieldSchema.kind === 'boolean') {
    return Boolean(value);
  }

  if (fieldSchema.kind === 'time') {
    return normalizeTimeOnly(value);
  }

  if (fieldSchema.kind === 'number') {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }

  if (fieldSchema.kind === 'json') {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    }

    return normalizeRecord(value);
  }

  return value;
}

function createRecordFromSqlRow(collection, row) {
  const fallbackRecord = normalizeRecord(row.payload, row.id) || {};
  const record = { ...fallbackRecord, id: row.id };
  const schema = getCollectionSchema(collection);

  for (const [fieldName, fieldSchema] of Object.entries(schema)) {
    const columnValue = row[fieldSchema.column];
    if (columnValue != null) {
      record[fieldSchema.target || fieldName] = deserializeSchemaValue(fieldSchema, columnValue);
    }
  }

  return normalizeRecord(record, row.id);
}

function getSchemaColumnDefinitions(collection) {
  return Object.values(getCollectionSchema(collection))
    .map((fieldSchema) => `${escapeSqlIdentifier(fieldSchema.column)} ${fieldSchema.type} NULL`);
}

function getSelectColumns(collection) {
  const baseColumns = [getIdColumn(collection), 'payload'];
  const schemaColumns = Object.values(getCollectionSchema(collection)).map((fieldSchema) => fieldSchema.column);
  return [...new Set([...baseColumns, ...schemaColumns])];
}

function buildColumnValues(collection, record) {
  const schema = getCollectionSchema(collection);
  return Object.entries(schema).map(([fieldName, fieldSchema]) => ({
    column: fieldSchema.column,
    value: serializeSchemaValue(
      fieldSchema,
      record[fieldSchema.source || fieldName] ?? fieldSchema.fallback
    )
  }));
}

function getAuditLogCutoffDate() {
  const retentionDays = Math.max(1, Number(env.auditLogRetentionDays) || 60);
  return new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
}

function getAuditLogTimestamp(record) {
  const candidates = [record?.createdAt, record?.updatedAt, record?.date];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const parsed = new Date(candidate);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return null;
}

function shouldExpireAuditLog(record, cutoffDate) {
  const timestamp = getAuditLogTimestamp(record);
  return timestamp instanceof Date && timestamp.getTime() < cutoffDate.getTime();
}

async function pruneExpiredAuditLogsFromJsonDriver() {
  ensureReady();
  const currentItems = Array.isArray(state.auditLogs) ? state.auditLogs : [];
  const cutoffDate = getAuditLogCutoffDate();
  const filteredItems = currentItems.filter((item) => !shouldExpireAuditLog(item, cutoffDate));
  const removedCount = currentItems.length - filteredItems.length;

  if (removedCount > 0) {
    state.auditLogs = filteredItems;
    await persist();
  }

  return removedCount;
}

async function pruneExpiredAuditLogsFromMysqlDriver() {
  const pool = await ensureSqlPool();
  const tableName = getJsonTableName('auditLogs');
  const schema = getCollectionSchema('auditLogs');
  const createdAtColumn = escapeSqlIdentifier(schema.createdAt.column);
  const updatedAtColumn = escapeSqlIdentifier(schema.updatedAt.column);
  const eventDateColumn = escapeSqlIdentifier(schema.date.column);
  const cutoffIso = getAuditLogCutoffDate().toISOString();
  const cutoffDate = cutoffIso.slice(0, 10);

  const [result] = await pool.query(
    `
      DELETE FROM ${escapeSqlIdentifier(tableName)}
      WHERE (
        NULLIF(TRIM(${createdAtColumn}), '') IS NOT NULL
        AND ${createdAtColumn} < ?
      ) OR (
        NULLIF(TRIM(${createdAtColumn}), '') IS NULL
        AND NULLIF(TRIM(${updatedAtColumn}), '') IS NOT NULL
        AND ${updatedAtColumn} < ?
      ) OR (
        NULLIF(TRIM(${createdAtColumn}), '') IS NULL
        AND NULLIF(TRIM(${updatedAtColumn}), '') IS NULL
        AND NULLIF(TRIM(${eventDateColumn}), '') IS NOT NULL
        AND ${eventDateColumn} < ?
      )
    `,
    [cutoffIso, cutoffIso, cutoffDate]
  );

  return Number(result.affectedRows || 0);
}

async function runAuditLogRetentionCleanup() {
  const retentionDays = Number(env.auditLogRetentionDays);
  if (!Number.isFinite(retentionDays) || retentionDays <= 0) {
    return 0;
  }

  auditLogCleanupPromise = auditLogCleanupPromise.then(async () => {
    const removedCount = activeDriver === mysqlDriver
      ? await pruneExpiredAuditLogsFromMysqlDriver()
      : await pruneExpiredAuditLogsFromJsonDriver();

    if (removedCount > 0) {
      console.log(`[audit-logs] ${removedCount} registro(s) com mais de ${retentionDays} dias foram removidos automaticamente.`);
    }

    return removedCount;
  }).catch((error) => {
    console.error('Falha ao executar limpeza automatica do historico:', error);
    return 0;
  });

  return auditLogCleanupPromise;
}

function startAuditLogRetentionJob() {
  if (auditLogCleanupTimer || Number(env.auditLogCleanupIntervalMs) <= 0) {
    return;
  }

  auditLogCleanupTimer = setInterval(() => {
    runAuditLogRetentionCleanup().catch((error) => {
      console.error('Falha no agendamento de limpeza do historico:', error);
    });
  }, Number(env.auditLogCleanupIntervalMs));

  if (typeof auditLogCleanupTimer.unref === 'function') {
    auditLogCleanupTimer.unref();
  }
}

async function ensureDataFile() {
  const absolutePath = path.resolve(env.dataFile);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });

  try {
    await fs.access(absolutePath);
  } catch {
    await fs.writeFile(absolutePath, JSON.stringify(defaultData, null, 2), 'utf8');
  }

  return absolutePath;
}

async function loadState() {
  const filePath = await ensureDataFile();
  let content = '';
  let lastError = null;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    content = await fs.readFile(filePath, 'utf8');
    try {
      JSON.parse(content);
      lastError = null;
      break;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  if (lastError) {
    throw lastError;
  }

  state = {
    ...clone(defaultData),
    ...JSON.parse(content)
  };
  state.counters = {
    ...clone(defaultData.counters),
    ...(state.counters || {})
  };

  for (const collection of COLLECTIONS) {
    if (!Array.isArray(state[collection])) {
      state[collection] = [];
    }
  }

  return filePath;
}

async function persist() {
  const filePath = await ensureDataFile();
  writeQueue = writeQueue.then(() => fs.writeFile(filePath, JSON.stringify(state, null, 2), 'utf8'));
  await writeQueue;
}

function ensureReady() {
  if (!state) {
    throw new Error('Database not initialized.');
  }
}

async function ensureSqlDatabase() {
  const bootstrapPool = await mysql.createPool({
    host: env.databaseHost,
    port: env.databasePort,
    user: env.databaseUser,
    password: env.databasePassword,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  });

  try {
    await bootstrapPool.query(`CREATE DATABASE IF NOT EXISTS ${escapeSqlIdentifier(env.databaseName)}`);
  } finally {
    await bootstrapPool.end();
  }
}

async function ensureSqlPool() {
  if (sqlPool) {
    return sqlPool;
  }

  await ensureSqlDatabase();

  sqlPool = mysql.createPool({
    host: env.databaseHost,
    port: env.databasePort,
    user: env.databaseUser,
    password: env.databasePassword,
    database: env.databaseName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    namedPlaceholders: true
  });

  return sqlPool;
}

async function sqlColumnExists(pool, tableName, columnName) {
  const [rows] = await pool.query(
    `
      SELECT 1 AS found
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = ?
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?
      LIMIT 1
    `,
    [env.databaseName, tableName, columnName]
  );

  return rows.length > 0;
}

async function ensureSqlColumn(pool, tableName, columnName, columnDefinition) {
  if (await sqlColumnExists(pool, tableName, columnName)) {
    return;
  }

  await pool.query(
    `ALTER TABLE ${escapeSqlIdentifier(tableName)} ADD COLUMN ${escapeSqlIdentifier(columnName)} ${columnDefinition}`
  );
}

async function ensureSqlTables() {
  const pool = await ensureSqlPool();

  for (const collection of COLLECTIONS) {
    const tableName = getJsonTableName(collection);
    const idColumn = getIdColumn(collection);
    const columnDefinitions = getSchemaColumnDefinitions(collection);
    const createColumns = [
      `${escapeSqlIdentifier(idColumn)} BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY`,
      'payload JSON NULL',
      ...columnDefinitions,
      'created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
      'updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    ];

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${escapeSqlIdentifier(tableName)} (
        ${createColumns.join(',\n        ')}
      )
    `);

    await ensureSqlColumn(pool, tableName, 'payload', 'JSON NULL');

    for (const fieldSchema of Object.values(getCollectionSchema(collection))) {
      await ensureSqlColumn(pool, tableName, fieldSchema.column, `${fieldSchema.type} NULL`);
    }
  }
}

async function migrateLegacyPayloadToColumns() {
  const pool = await ensureSqlPool();

  for (const collection of COLLECTIONS) {
    const tableName = getJsonTableName(collection);
    const idColumn = getIdColumn(collection);
    const selectColumns = getSelectColumns(collection)
      .map((column) => column === idColumn ? `${escapeSqlIdentifier(column)} AS id` : escapeSqlIdentifier(column))
      .join(', ');
    const [rows] = await pool.query(`SELECT ${selectColumns} FROM ${escapeSqlIdentifier(tableName)}`);

    for (const row of rows) {
      if (row.payload == null) {
        continue;
      }

      const record = createRecordFromSqlRow(collection, row);
      const columnValues = buildColumnValues(collection, record);
      const assignments = ['payload = ?'];
      const values = [JSON.stringify(record)];

      for (const { column, value } of columnValues) {
        assignments.push(`${escapeSqlIdentifier(column)} = ?`);
        values.push(value);
      }

      values.push(row.id);
      await pool.query(
        `UPDATE ${escapeSqlIdentifier(tableName)} SET ${assignments.join(', ')} WHERE ${escapeSqlIdentifier(idColumn)} = ?`,
        values
      );
    }
  }
}

async function seedSqlDatabase() {
  const pool = await ensureSqlPool();

  for (const collection of COLLECTIONS) {
    const tableName = getJsonTableName(collection);
    const idColumn = getIdColumn(collection);
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM ${escapeSqlIdentifier(tableName)}`);
    if (Number(total) > 0) {
      continue;
    }

    const seedItems = Array.isArray(defaultData[collection]) ? defaultData[collection] : [];
    for (const item of seedItems) {
      const normalized = normalizeRecord(item);
      if (!normalized) {
        continue;
      }

      const columnValues = buildColumnValues(collection, normalized);
      const columns = [idColumn, 'payload', ...columnValues.map(({ column }) => column)];
      const values = [normalized.id ?? null, JSON.stringify(normalized), ...columnValues.map(({ value }) => value)];
      const placeholders = columns.map(() => '?').join(', ');

      await pool.query(
        `INSERT INTO ${escapeSqlIdentifier(tableName)} (${columns.map(escapeSqlIdentifier).join(', ')}) VALUES (${placeholders})`,
        values
      );
    }
  }
}

async function sqlSelectById(collection, id) {
  const pool = await ensureSqlPool();
  const tableName = getJsonTableName(collection);
  const idColumn = getIdColumn(collection);
  const selectColumns = getSelectColumns(collection)
    .map((column) => column === idColumn ? `${escapeSqlIdentifier(column)} AS id` : escapeSqlIdentifier(column))
    .join(', ');
  const [rows] = await pool.query(
    `SELECT ${selectColumns} FROM ${escapeSqlIdentifier(tableName)} WHERE ${escapeSqlIdentifier(idColumn)} = ? LIMIT 1`,
    [id]
  );

  if (!rows.length) return null;
  return createRecordFromSqlRow(collection, rows[0]);
}

async function sqlList(collection) {
  const pool = await ensureSqlPool();
  const tableName = getJsonTableName(collection);
  const idColumn = getIdColumn(collection);
  const selectColumns = getSelectColumns(collection)
    .map((column) => column === idColumn ? `${escapeSqlIdentifier(column)} AS id` : escapeSqlIdentifier(column))
    .join(', ');
  const [rows] = await pool.query(
    `SELECT ${selectColumns} FROM ${escapeSqlIdentifier(tableName)} ORDER BY ${escapeSqlIdentifier(idColumn)} DESC`
  );
  return rows.map((row) => createRecordFromSqlRow(collection, row));
}

async function sqlInsertRecord(collection, payload) {
  const pool = await ensureSqlPool();
  const tableName = getJsonTableName(collection);
  const idColumn = getIdColumn(collection);
  const record = normalizeRecord({ ...payload, id: undefined });
  const columnValues = buildColumnValues(collection, record);
  const columns = ['payload', ...columnValues.map(({ column }) => column)];
  const values = [JSON.stringify(record), ...columnValues.map(({ value }) => value)];
  const placeholders = columns.map(() => '?').join(', ');

  const [result] = await pool.query(
    `INSERT INTO ${escapeSqlIdentifier(tableName)} (${columns.map(escapeSqlIdentifier).join(', ')}) VALUES (${placeholders})`,
    values
  );

  record.id = result.insertId;
  const updateAssignments = ['payload = ?'];
  const updateValues = [JSON.stringify(record)];

  for (const { column, value } of buildColumnValues(collection, record)) {
    updateAssignments.push(`${escapeSqlIdentifier(column)} = ?`);
    updateValues.push(value);
  }

  updateValues.push(result.insertId);
  await pool.query(
    `UPDATE ${escapeSqlIdentifier(tableName)} SET ${updateAssignments.join(', ')} WHERE ${escapeSqlIdentifier(idColumn)} = ?`,
    updateValues
  );

  return normalizeRecord(record, result.insertId);
}

async function sqlUpdateRecord(collection, id, updater) {
  const pool = await ensureSqlPool();
  const current = await sqlSelectById(collection, id);
  if (!current) return null;

  const next = normalizeRecord({ ...current, ...updater(current), id: current.id });
  const tableName = getJsonTableName(collection);
  const idColumn = getIdColumn(collection);
  const assignments = ['payload = ?'];
  const values = [JSON.stringify(next)];

  for (const { column, value } of buildColumnValues(collection, next)) {
    assignments.push(`${escapeSqlIdentifier(column)} = ?`);
    values.push(value);
  }

  values.push(current.id);
  await pool.query(
    `UPDATE ${escapeSqlIdentifier(tableName)} SET ${assignments.join(', ')} WHERE ${escapeSqlIdentifier(idColumn)} = ?`,
    values
  );

  return normalizeRecord(next);
}

const jsonDriver = {
  async connect() {
    if (!state) {
      await loadState();
    }
  },

  async list(collection) {
    ensureReady();
    return clone(state[collection] || []);
  },

  async getById(collection, id) {
    ensureReady();
    const item = (state[collection] || []).find((entry) => String(entry.id) === String(id));
    return item ? clone(item) : null;
  },

  async findOne(collection, predicate) {
    ensureReady();
    const item = (state[collection] || []).find(predicate);
    return item ? clone(item) : null;
  },

  async create(collection, payload) {
    ensureReady();
    const counterKey = collection;
    if (!Number.isFinite(Number(state.counters[counterKey]))) {
      const highestId = (state[collection] || []).reduce((highest, item) => {
        const itemId = Number(item?.id);
        return Number.isFinite(itemId) && itemId > highest ? itemId : highest;
      }, 0);
      state.counters[counterKey] = highestId + 1;
    }

    const id = payload.id ?? state.counters[counterKey]++;
    const record = { ...payload, id };
    state[collection].unshift(record);
    await persist();
    return clone(record);
  },

  async update(collection, id, updater) {
    ensureReady();
    const index = (state[collection] || []).findIndex((entry) => String(entry.id) === String(id));
    if (index === -1) return null;

    const current = state[collection][index];
    const next = { ...current, ...updater(current), id: current.id };
    state[collection][index] = next;
    await persist();
    return clone(next);
  },

  async remove(collection, id) {
    ensureReady();
    const index = (state[collection] || []).findIndex((entry) => String(entry.id) === String(id));
    if (index === -1) return null;

    const [removed] = state[collection].splice(index, 1);
    await persist();
    return clone(removed);
  }
};

const mysqlDriver = {
  async connect() {
    await ensureSqlPool();
    await ensureSqlTables();
    await seedSqlDatabase();
    await migrateLegacyPayloadToColumns();
  },

  async list(collection) {
    return sqlList(collection);
  },

  async getById(collection, id) {
    return sqlSelectById(collection, id);
  },

  async findOne(collection, predicate) {
    const items = await sqlList(collection);
    return items.find(predicate) || null;
  },

  async create(collection, payload) {
    return sqlInsertRecord(collection, payload);
  },

  async update(collection, id, updater) {
    return sqlUpdateRecord(collection, id, updater);
  },

  async remove(collection, id) {
    const pool = await ensureSqlPool();
    const current = await sqlSelectById(collection, id);
    if (!current) return null;

    const tableName = getJsonTableName(collection);
    const idColumn = getIdColumn(collection);
    await pool.query(`DELETE FROM ${escapeSqlIdentifier(tableName)} WHERE ${escapeSqlIdentifier(idColumn)} = ?`, [id]);
    return current;
  }
};

function getDatabaseDriver(driverName = env.databaseDriver) {
  if (driverName === 'json') {
    return jsonDriver;
  }

  if (driverName === 'mysql') {
    return mysqlDriver;
  }

  throw new Error(
    `DB_DRIVER=${driverName} nao suportado. Use "json" ou "mysql".`
  );
}

let activeDriver = getDatabaseDriver();

function shouldFallbackToJson(error) {
  if (env.databaseDriver !== 'mysql' || env.nodeEnv === 'production') {
    return false;
  }

  return ['ECONNREFUSED', 'EPERM', 'ENOTFOUND', 'EHOSTUNREACH'].includes(error?.code);
}

function activateJsonFallback(error) {
  console.warn(
    `MySQL indisponivel (${error?.code || 'erro-desconhecido'}). CampoSync vai usar armazenamento JSON local em ${env.dataFile}.`
  );
  activeDriver = jsonDriver;
}

export async function initDatabase() {
  try {
    await activeDriver.connect();
  } catch (error) {
    if (!shouldFallbackToJson(error)) {
      throw error;
    }

    activateJsonFallback(error);
    await activeDriver.connect();
  }

  await ensureDefaultUnits();

  await runAuditLogRetentionCleanup();
  startAuditLogRetentionJob();
}

export const db = {
  async list(collection) {
    if (collection === 'auditLogs') {
      await runAuditLogRetentionCleanup();
    }

    return activeDriver.list(collection);
  },

  async getById(collection, id) {
    if (collection === 'auditLogs') {
      await runAuditLogRetentionCleanup();
    }

    return activeDriver.getById(collection, id);
  },

  findOne(collection, predicate) {
    return activeDriver.findOne(collection, predicate);
  },

  async create(collection, payload) {
    if (collection === 'auditLogs') {
      await runAuditLogRetentionCleanup();
    }

    return activeDriver.create(collection, payload);
  },

  update(collection, id, updater) {
    return activeDriver.update(collection, id, updater);
  },

  remove(collection, id) {
    return activeDriver.remove(collection, id);
  }
};
