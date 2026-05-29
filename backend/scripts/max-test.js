import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');
const frontendDir = path.join(projectRoot, 'frontend');

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:5000';
const DB_CONFIG = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'CampoSync'
};

const uniqueTag = `max-${Date.now()}`;
const testUser = {
  name: `Teste Maximo ${uniqueTag}`,
  email: `${uniqueTag}@camposync.local`,
  password: 'SenhaTeste123!'
};

const createdRecords = [];
const skipped = [];
const results = [];

function log(message) {
  console.log(message);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function request(method, route, { token, body, expectedStatus, headers } = {}) {
  const response = await fetch(`${BASE_URL}${route}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (expectedStatus != null && response.status !== expectedStatus) {
    throw new Error(`${method} ${route} retornou ${response.status}, esperado ${expectedStatus}. Resposta: ${text}`);
  }

  return { status: response.status, data, text, headers: response.headers };
}

async function expectSqlRow(connection, table, idColumn, id, expected = {}) {
  const [rows] = await connection.query(
    `SELECT * FROM \`${table}\` WHERE \`${idColumn}\` = ? LIMIT 1`,
    [id]
  );
  assert(rows.length === 1, `Registro ${table}.${idColumn}=${id} nao encontrado no MySQL.`);
  const row = rows[0];

  for (const [column, expectedValue] of Object.entries(expected)) {
    assert(
      String(row[column]) === String(expectedValue),
      `Valor inesperado em ${table}.${column}: recebido "${row[column]}", esperado "${expectedValue}".`
    );
  }

  return row;
}

async function testStaticPages() {
  const entries = await fs.readdir(frontendDir);
  const htmlFiles = entries.filter((file) => file.endsWith('.html')).sort();

  for (const file of htmlFiles) {
    const response = await request('GET', `/${file}`, { expectedStatus: 200 });
    assert(
      String(response.headers.get('content-type') || '').includes('text/html'),
      `Arquivo ${file} nao foi servido como HTML.`
    );
  }

  results.push({ area: 'frontend', check: `${htmlFiles.length} paginas HTML servidas`, status: 'ok' });
}

async function testPublicApi() {
  const health = await request('GET', '/health', { expectedStatus: 200 });
  assert(health.data?.status === 'ok', 'Healthcheck nao retornou status ok.');

  const root = await request('GET', '/', { expectedStatus: 200 });
  assert(String(root.headers.get('content-type') || '').includes('text/html'), 'Raiz nao serviu HTML.');

  const locations = await request('GET', '/api/locations', { expectedStatus: 200 });
  assert(Array.isArray(locations.data), 'Locations deveria retornar uma lista.');

  const units = await request('GET', '/api/units/custom', { expectedStatus: 200 });
  assert(Array.isArray(units.data) && units.data.length >= 11, 'Unidades padrao nao foram carregadas.');

  const notifications = await request('GET', '/api/notifications', { expectedStatus: 200 });
  assert(Array.isArray(notifications.data), 'Notifications deveria retornar uma lista.');

  const auditLogs = await request('GET', '/api/audit-logs', { expectedStatus: 200 });
  assert(Array.isArray(auditLogs.data), 'Audit logs deveria retornar uma lista.');

  results.push({ area: 'api-publica', check: 'rotas publicas principais', status: 'ok' });
}

async function testAuth(connection) {
  const register = await request('POST', '/api/auth/register', {
    expectedStatus: 201,
    body: testUser
  });

  const userId = register.data?.user?.id;
  assert(userId, 'Cadastro nao retornou id de usuario.');
  createdRecords.push({ table: 'usuarios', idColumn: 'id_usuario', id: userId });
  await expectSqlRow(connection, 'usuarios', 'id_usuario', userId, {
    email: testUser.email,
    name: testUser.name
  });

  const login = await request('POST', '/api/auth/login', {
    expectedStatus: 200,
    body: {
      email: testUser.email,
      password: testUser.password
    }
  });

  const token = login.data?.token;
  assert(token, 'Login nao retornou token.');

  const me = await request('GET', '/api/auth/me', {
    expectedStatus: 200,
    token
  });
  assert(me.data?.user?.email === testUser.email, 'Endpoint /me retornou usuario incorreto.');

  const recovery = await request('POST', '/api/auth/password-recovery-request', {
    expectedStatus: 200,
    body: { email: `naoexiste-${uniqueTag}@camposync.local` }
  });
  assert(
    String(recovery.data?.message || '').includes('redefinicao') || String(recovery.data?.message || '').includes('redefinicao'.normalize('NFD')),
    'Password recovery request nao respondeu como esperado para e-mail inexistente.'
  );

  const resetInvalid = await request('POST', '/api/auth/password-reset', {
    expectedStatus: 400,
    body: {
      token: 'token-invalido-longo-o-suficiente',
      password: 'NovaSenha123!'
    }
  });
  assert(resetInvalid.status === 400, 'Password reset invalido deveria retornar 400.');

  results.push({ area: 'auth', check: 'cadastro, login, me e fluxos seguros de recuperacao', status: 'ok' });
  return token;
}

async function testCollections(connection, token) {
  const purchase = await request('POST', '/api/purchases', {
    expectedStatus: 201,
    token,
    body: {
      item: `Racao ${uniqueTag}`,
      category: 'avicultura',
      date: '2026-05-15',
      quantity: 10,
      unitPrice: 19.9,
      stock: 25,
      minStock: 5,
      notes: 'compra de teste'
    }
  });
  const purchaseId = purchase.data.id;
  createdRecords.push({ table: 'compras', idColumn: 'id', id: purchaseId });
  await expectSqlRow(connection, 'compras', 'id', purchaseId, { item: `Racao ${uniqueTag}` });
  const purchaseUpdate = await request('PUT', `/api/purchases/${purchaseId}`, {
    expectedStatus: 200,
    token,
    body: { ...purchase.data, notes: 'compra de teste atualizada' }
  });
  assert(purchaseUpdate.data.notes === 'compra de teste atualizada', 'Atualizacao de compra falhou.');

  const sale = await request('POST', '/api/sales', {
    expectedStatus: 201,
    token,
    body: {
      produto: `Ovos ${uniqueTag}`,
      categoria: 'avicultura',
      quantidade: 12,
      valor_unitario: 2.5,
      data_venda: '2026-05-15',
      cliente: 'Cliente Teste',
      observacoes: 'venda de teste'
    }
  });
  createdRecords.push({ table: 'vendas', idColumn: 'id_venda', id: sale.data.id });
  await expectSqlRow(connection, 'vendas', 'id_venda', sale.data.id, { cliente: 'Cliente Teste' });

  const consumption = await request('POST', '/api/consumptions', {
    expectedStatus: 201,
    token,
    body: {
      produto: `Milho ${uniqueTag}`,
      categoria: 'avicultura',
      data_consumo: '2026-05-15',
      quantidade: 7,
      stock: 13,
      minStock: 4,
      observacoes: 'consumo de teste'
    }
  });
  createdRecords.push({ table: 'consumos', idColumn: 'id', id: consumption.data.id });
  await expectSqlRow(connection, 'consumos', 'id', consumption.data.id, { produto: `Milho ${uniqueTag}` });
  assert(Number(consumption.data.estimatedCost) > 0, 'Consumo nao calculou estimatedCost.');

  const action = await request('POST', '/api/actions', {
    expectedStatus: 201,
    token,
    body: {
      acao: `Inspecao ${uniqueTag}`,
      unidade: 'avicultura',
      data_acao: '2026-05-15',
      hora_acao: '09:30',
      detalhes_acao: 'acao de teste'
    }
  });
  createdRecords.push({ table: 'acoes', idColumn: 'id_acao', id: action.data.id });
  await expectSqlRow(connection, 'acoes', 'id_acao', action.data.id, { unidade: 'avicultura' });

  const supply = await request('POST', '/api/supplies', {
    expectedStatus: 201,
    token,
    body: {
      product: `Suprimento ${uniqueTag}`,
      domain: 'avicultura',
      stock: 2,
      minStock: 5,
      unitPrice: 8.7,
      notes: 'suprimento de teste'
    }
  });
  createdRecords.push({ table: 'produtos', idColumn: 'id_produto', id: supply.data.id });
  await expectSqlRow(connection, 'produtos', 'id_produto', supply.data.id, { product: `Suprimento ${uniqueTag}` });

  const notifications = await request('GET', '/api/notifications', { expectedStatus: 200 });
  const lowStockNotification = notifications.data.find((item) => String(item.title || '').includes(uniqueTag));
  assert(lowStockNotification, 'Criacao de suprimento com estoque baixo nao gerou notificacao.');
  await expectSqlRow(connection, 'cs_notifications', 'id', lowStockNotification.id, { title: lowStockNotification.title });

  const manualNotification = await request('POST', '/api/notifications', {
    expectedStatus: 201,
    token,
    body: {
      title: `Notificacao ${uniqueTag}`,
      message: 'mensagem de teste',
      read: false
    }
  });
  createdRecords.push({ table: 'cs_notifications', idColumn: 'id', id: manualNotification.data.id });
  const markRead = await request('PATCH', `/api/notifications/${manualNotification.data.id}/read`, {
    expectedStatus: 200,
    token
  });
  assert(markRead.data.read === true, 'Marcacao de notificacao como lida falhou.');
  await request('PATCH', '/api/notifications/read-all', {
    expectedStatus: 200,
    token
  });

  const material = await request('POST', '/api/materials', {
    expectedStatus: 201,
    token,
    body: {
      material: `Ferramenta ${uniqueTag}`,
      categoria: 'equipamento',
      quantidade: 3,
      status: 'Disponivel',
      dominio: 'avicultura',
      ultima_inspecao: '2026-05-15',
      observacoes: 'material de teste'
    }
  });
  createdRecords.push({ table: 'materiais', idColumn: 'id_material', id: material.data.id });
  await expectSqlRow(connection, 'materiais', 'id_material', material.data.id, { material: `Ferramenta ${uniqueTag}` });

  const unit = await request('POST', '/api/units/custom', {
    expectedStatus: 201,
    token,
    body: {
      name: `Unidade ${uniqueTag}`,
      category: 'animal',
      descricao: 'unidade de teste',
      responsavel: testUser.email
    }
  });
  createdRecords.push({ table: 'cadastrar_areas_produtivas', idColumn: 'id', id: unit.data.id });
  await expectSqlRow(connection, 'cadastrar_areas_produtivas', 'id', unit.data.id, { name: `Unidade ${uniqueTag}` });
  const updatedUnit = await request('PUT', `/api/units/custom/${unit.data.id}`, {
    expectedStatus: 200,
    token,
    body: { ...unit.data, descricao: 'unidade de teste atualizada' }
  });
  assert(updatedUnit.data.descricao === 'unidade de teste atualizada', 'Atualizacao de unidade falhou.');

  const audit = await request('POST', '/api/audit-logs', {
    expectedStatus: 201,
    token,
    body: {
      type: 'Teste',
      title: `Auditoria ${uniqueTag}`,
      details: 'auditoria criada no teste maximo',
      area: 'QA',
      status: 'Concluido',
      date: '2026-05-15',
      time: '10:15',
      user: testUser.email,
      source: 'max-test',
      entityType: 'qa-run',
      entityId: uniqueTag,
      metadata: { uniqueTag }
    }
  });
  createdRecords.push({ table: 'cs_auditlogs', idColumn: 'id', id: audit.data.id });
  await expectSqlRow(connection, 'cs_auditlogs', 'id', audit.data.id, { source_name: 'max-test' });

  const purchaseDelete = await request('DELETE', `/api/purchases/${purchaseId}`, {
    expectedStatus: 200,
    token
  });
  assert(purchaseDelete.data?.item?.id === purchaseId, 'Remocao de compra nao retornou o item correto.');
  const [deletedPurchaseRows] = await connection.query('SELECT COUNT(*) AS total FROM `compras` WHERE `id` = ?', [purchaseId]);
  assert(Number(deletedPurchaseRows[0].total) === 0, 'Compra removida ainda existe no MySQL.');

  const unitDelete = await request('DELETE', `/api/units/custom/${unit.data.id}`, {
    expectedStatus: 200,
    token
  });
  assert(unitDelete.data?.item?.id === unit.data.id, 'Remocao de unidade nao retornou o item correto.');
  const [deletedUnitRows] = await connection.query('SELECT COUNT(*) AS total FROM `cadastrar_areas_produtivas` WHERE `id` = ?', [unit.data.id]);
  assert(Number(deletedUnitRows[0].total) === 0, 'Unidade removida ainda existe no MySQL.');

  results.push({ area: 'colecoes', check: 'CRUD principal e persistencia MySQL', status: 'ok' });
}

function registerSkippedChecks() {
  skipped.push('Google OAuth nao foi exercitado porque depende de redirecionamento externo e credenciais do Google.');
  skipped.push('POST /api/auth/password-recovery-request com usuario real nao foi disparado para evitar envio de e-mail externo.');
  skipped.push('POST /api/assistant/* nao foi exercitado porque depende de acesso externo a API da OpenAI.');
}

async function main() {
  const connection = await mysql.createConnection(DB_CONFIG);

  try {
    log(`Iniciando teste maximo contra ${BASE_URL}`);
    await testStaticPages();
    await testPublicApi();
    const token = await testAuth(connection);
    await testCollections(connection, token);
    registerSkippedChecks();

    log('');
    log('Resumo dos testes:');
    for (const item of results) {
      log(`OK  | ${item.area} | ${item.check}`);
    }
    for (const item of skipped) {
      log(`SKIP| ${item}`);
    }
    log('');
    log(`Teste maximo concluido com sucesso. Usuario criado: ${testUser.email}`);
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error('');
  console.error('Teste maximo falhou.');
  console.error(error.stack || error.message || error);
  process.exit(1);
});
