import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs/promises';
import authRoutes from '../src/routes/auth.js';
import actionsRoutes from '../src/routes/actions.js';
import assistantRoutes from '../src/routes/assistant.js';
import notificationsRoutes from '../src/routes/notifications.js';
import purchasesRoutes from '../src/routes/purchases.js';
import salesRoutes from '../src/routes/sales.js';
import consumptionsRoutes from '../src/routes/consumptions.js';
import dailyUnitActivitiesRoutes from '../src/routes/daily-unit-activities.js';
import unitsRoutes from '../src/routes/units.js';
import { env } from '../src/config/env.js';
import { db, initDatabase } from '../src/config/database.js';
import { AppError } from '../src/lib/errors.js';

env.dataFile = './data/camposync-auth-access-test.json';

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

function createMockResponse() {
  return {
    statusCode: 200,
    payload: undefined,
    headers: {},
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    },
    redirect(url) {
      this.redirectTo = url;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
    },
    getHeader(name) {
      return this.headers[name];
    }
  };
}

function getRouteLayers(router, routePath, method) {
  const layer = router.stack.find((entry) => {
    return (
      entry.route?.path === routePath &&
      entry.route?.stack?.some((stackEntry) => stackEntry.method === method)
    );
  });
  if (!layer) {
    throw new Error(`Route ${method.toUpperCase()} ${routePath} not found.`);
  }

  const handlers = layer.route.stack.filter((entry) => entry.method === method);
  if (!handlers.length) {
    throw new Error(`Method ${method.toUpperCase()} for route ${routePath} not found.`);
  }

  return handlers.map((entry) => entry.handle);
}

async function executeHandlers(handlers, req) {
  const res = createMockResponse();

  for (const handler of handlers) {
    await new Promise((resolve, reject) => {
      let settled = false;
      const next = (error) => {
        if (settled) return;
        settled = true;
        if (error) {
          reject(error);
          return;
        }
        resolve();
      };

      Promise.resolve(handler(req, res, next))
        .then(() => {
          if (!settled) {
            settled = true;
            resolve();
          }
        })
        .catch((error) => {
          if (!settled) {
            settled = true;
            reject(error);
          }
        });
    });
  }

  return res;
}

async function executeRoute(router, routePath, method, req = {}) {
  const handlers = getRouteLayers(router, routePath, method);
  return executeHandlers(handlers, {
    headers: {},
    body: {},
    params: {},
    query: {},
    protocol: 'http',
    get(headerName) {
      return this.headers?.[String(headerName).toLowerCase()] || '';
    },
    ...req
  });
}

async function resetDatabase() {
  await fs.writeFile(env.dataFile, JSON.stringify(emptyState, null, 2), 'utf8');
  await initDatabase();
}

async function registerAndLogin(email = 'teste@example.com') {
  await executeRoute(authRoutes, '/register', 'post', {
    body: {
      name: 'Teste Usuario',
      email,
      password: 'Senha123'
    }
  });

  const loginResponse = await executeRoute(authRoutes, '/login', 'post', {
    body: {
      email,
      password: 'Senha123'
    }
  });

  return loginResponse.payload.token;
}

test('autenticacao deve permitir registrar, autenticar e consultar /me', { concurrency: false }, async () => {
  await resetDatabase();

  const token = await registerAndLogin();
  const meResponse = await executeRoute(authRoutes, '/me', 'get', {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  assert.equal(meResponse.statusCode, 200);
  assert.equal(meResponse.payload.user.email, 'teste@example.com');
  assert.equal(meResponse.payload.user.name, 'Teste Usuario');
});

test('autenticacao deve permitir atualizar a foto no /me autenticado', { concurrency: false }, async () => {
  await resetDatabase();

  const token = await registerAndLogin('avatar@example.com');
  const avatarUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9p2qGJ0AAAAASUVORK5CYII=';
  const updateResponse = await executeRoute(authRoutes, '/me', 'patch', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      avatarUrl
    }
  });

  assert.equal(updateResponse.statusCode, 200);
  assert.equal(updateResponse.payload.user.email, 'avatar@example.com');
  assert.equal(updateResponse.payload.user.avatarUrl, avatarUrl);

  const meResponse = await executeRoute(authRoutes, '/me', 'get', {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  assert.equal(meResponse.statusCode, 200);
  assert.equal(meResponse.payload.user.avatarUrl, avatarUrl);
});

test('recuperacao de senha deve gerar token e permitir novo login', { concurrency: false }, async () => {
  await resetDatabase();

  await executeRoute(authRoutes, '/register', 'post', {
    body: {
      name: 'Recuperacao Usuario',
      email: 'recuperacao@example.com',
      password: 'Senha123'
    },
    headers: {
      origin: 'http://localhost:5000'
    }
  });

  const recoveryResponse = await executeRoute(authRoutes, '/password-recovery-request', 'post', {
    body: {
      email: 'recuperacao@example.com'
    },
    headers: {
      origin: 'http://localhost:5000'
    }
  });

  assert.equal(recoveryResponse.statusCode, 200);
  assert.match(recoveryResponse.payload.message, /codigo de redefinicao/i);
  assert.ok(recoveryResponse.payload.resetCode);

  const resetResponse = await executeRoute(authRoutes, '/password-reset', 'post', {
    body: {
      email: 'recuperacao@example.com',
      code: recoveryResponse.payload.resetCode,
      password: 'NovaSenha123'
    }
  });

  assert.equal(resetResponse.statusCode, 200);
  assert.match(resetResponse.payload.message, /Senha redefinida/i);

  await assert.rejects(
    () => executeRoute(authRoutes, '/login', 'post', {
      body: {
        email: 'recuperacao@example.com',
        password: 'Senha123'
      }
    }),
    AppError
  );

  const loginResponse = await executeRoute(authRoutes, '/login', 'post', {
    body: {
      email: 'recuperacao@example.com',
      password: 'NovaSenha123'
    }
  });

  assert.equal(loginResponse.statusCode, 200);
  assert.ok(loginResponse.payload.token);
});

test('assistant deve responder com dados reais do CampoSync', { concurrency: false }, async () => {
  await resetDatabase();

  const token = await registerAndLogin('assistant@example.com');

  await db.create('supplies', {
    product: 'Adubo orgânico',
    domain: 'Horticultura',
    stock: 5,
    minStock: 8,
    createdAt: '2026-05-18T10:00:00.000Z'
  });
  await db.create('purchases', {
    item: 'Adubo orgânico',
    category: 'Horticultura',
    quantity: 10,
    unitPrice: 12,
    stock: 10,
    minStock: 5,
    date: '2026-05-18',
    createdAt: '2026-05-18T10:00:00.000Z'
  });
  await db.create('sales', {
    produto: 'Alface',
    categoria: 'Horticultura',
    quantidade: 4,
    valor_unitario: 15,
    data_venda: '2026-05-18',
    cliente: 'Feira local',
    createdAt: '2026-05-18T10:10:00.000Z'
  });

  const response = await executeRoute(assistantRoutes, '/messages', 'post', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      message: 'Me mostre o estoque e o financeiro do CampoSync'
    }
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.payload.answer, /suprimentos cadastrados/i);
  assert.match(response.payload.answer, /nível crítico ou mínimo|nivel critico ou minimo/i);
  assert.match(response.payload.answer, /Financeiro do CampoSync/i);
  assert.match(response.payload.answer, /R\$/i);
});

test('assistant deve recusar assunto fora do CampoSync', { concurrency: false }, async () => {
  await resetDatabase();

  const token = await registerAndLogin('assistant-fora-escopo@example.com');
  const response = await executeRoute(assistantRoutes, '/messages', 'post', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      message: 'Quem ganhou a copa do mundo de 2002?'
    }
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.payload.answer, /apenas assuntos do CampoSync/i);
});

test('assistant deve gerar relatorio real de compras e financeiro', { concurrency: false }, async () => {
  await resetDatabase();

  const token = await registerAndLogin('assistant-relatorio@example.com');

  await db.create('purchases', {
    item: 'Ração inicial',
    category: 'Avicultura',
    quantity: 12,
    unitPrice: 25,
    stock: 12,
    minStock: 4,
    date: '2026-05-18',
    createdAt: '2026-05-18T08:00:00.000Z'
  });

  await db.create('sales', {
    produto: 'Ovos caipira',
    categoria: 'Avicultura',
    quantidade: 30,
    valor_unitario: 2,
    data_venda: '2026-05-18',
    cliente: 'Mercado local',
    createdAt: '2026-05-18T09:00:00.000Z'
  });

  const response = await executeRoute(assistantRoutes, '/messages', 'post', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      message: 'Crie um relatório real de compras e financeiro do CampoSync'
    }
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.payload.answer, /Relatório real de compras/i);
  assert.match(response.payload.answer, /Relatório real de financeiro e gastos/i);
  assert.match(response.payload.answer, /Ração inicial/i);
  assert.match(response.payload.answer, /saldo atual/i);
  assert.match(response.payload.answer, /R\$/i);
});

test('assistant deve filtrar relatorio por periodo e categoria e exportar csv', { concurrency: false }, async () => {
  await resetDatabase();

  const token = await registerAndLogin('assistant-filtro@example.com');
  const today = new Date().toISOString().slice(0, 10);
  const oldDate = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  await db.create('purchases', {
    item: 'Semente de alface',
    category: 'Horticultura',
    quantity: 20,
    unitPrice: 3,
    stock: 20,
    minStock: 5,
    date: today,
    createdAt: `${today}T09:00:00.000Z`
  });

  await db.create('purchases', {
    item: 'Ração de postura',
    category: 'Avicultura',
    quantity: 8,
    unitPrice: 18,
    stock: 8,
    minStock: 2,
    date: oldDate,
    createdAt: `${oldDate}T09:00:00.000Z`
  });

  const response = await executeRoute(assistantRoutes, '/messages', 'post', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      message: 'Exporte em csv um relatório de compras da horticultura dos últimos 7 dias do CampoSync'
    }
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.payload.answer, /Relatório real de compras/i);
  assert.ok(response.payload.export);
  assert.equal(response.payload.export.mimeType, 'text/csv; charset=utf-8');
  assert.match(response.payload.export.filename, /\.csv$/i);

  const csvContent = Buffer.from(response.payload.export.contentBase64, 'base64').toString('utf8');
  assert.match(csvContent, /Compras/);
  assert.match(csvContent, /Semente de alface/);
  assert.doesNotMatch(csvContent, /Ração de postura/);
});

test('colecoes protegidas devem aplicar requireAuth na leitura', { concurrency: false }, async () => {
  const protectedRouters = [
    purchasesRoutes,
    salesRoutes,
    consumptionsRoutes,
    dailyUnitActivitiesRoutes
  ];

  protectedRouters.forEach((router) => {
    const listHandlers = getRouteLayers(router, '/', 'get');
    const detailHandlers = getRouteLayers(router, '/:id', 'get');

    assert.equal(listHandlers[0].name, 'requireAuth');
    assert.equal(detailHandlers[0].name, 'requireAuth');
  });
});

test('acoes devem aceitar performerName opcional no fluxo da dashboard', { concurrency: false }, async () => {
  await resetDatabase();

  const token = await registerAndLogin('acoes@example.com');
  const createResponse = await executeRoute(actionsRoutes, '/', 'post', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      acao: 'Revisar irrigacao',
      unidade: 'horticultura',
      data_acao: '2026-05-17',
      hora_acao: '10:00',
      detalhes_acao: 'Checklist da dashboard'
    }
  });

  assert.equal(createResponse.statusCode, 201);
  assert.equal(createResponse.payload.acao, 'Revisar irrigacao');
  assert.equal(createResponse.payload.performerName, '');

  const savedActions = await db.list('actions');
  assert.equal(savedActions.length, 1);
  assert.equal(savedActions[0].performerName, '');
});

test('units deve expor unidades padrao em leitura publica', { concurrency: false }, async () => {
  await resetDatabase();

  const listResponse = await executeRoute(unitsRoutes, '/', 'get');

  assert.equal(listResponse.statusCode, 200);
  assert.ok(Array.isArray(listResponse.payload));
  assert.ok(listResponse.payload.length >= 11);
  assert.ok(listResponse.payload.some((item) => item.slug === 'suinocultura'));
});

test('units deve impedir remocao de unidade padrao', { concurrency: false }, async () => {
  await resetDatabase();
  const token = await registerAndLogin('units@example.com');
  const listResponse = await executeRoute(unitsRoutes, '/', 'get');
  const defaultUnit = listResponse.payload.find((item) => item.isDefault);

  await assert.rejects(
    () => executeRoute(unitsRoutes, '/:id', 'delete', {
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        id: String(defaultUnit.id)
      }
    }),
    (error) => {
      assert.ok(error instanceof AppError);
      assert.equal(error.statusCode, 400);
      assert.match(error.message, /não podem ser removidas|nao podem ser removidas/i);
      return true;
    }
  );
});

test('notifications deve exigir autenticacao para escrita e alteracoes', { concurrency: false }, async () => {
  const handlers = {
    create: getRouteLayers(notificationsRoutes, '/', 'post'),
    readOne: getRouteLayers(notificationsRoutes, '/:id/read', 'patch'),
    readAll: getRouteLayers(notificationsRoutes, '/read-all', 'patch')
  };

  assert.equal(handlers.create[0].name, 'requireAuth');
  assert.equal(handlers.readOne[0].name, 'requireAuth');
  assert.equal(handlers.readAll[0].name, 'requireAuth');
});

test('notifications deve criar e marcar leituras com usuario autenticado', { concurrency: false }, async () => {
  await resetDatabase();
  const token = await registerAndLogin('notif@example.com');

  const createResponse = await executeRoute(notificationsRoutes, '/', 'post', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      title: 'Alerta de teste',
      message: 'Mensagem importante',
      time: '09:30'
    }
  });

  assert.equal(createResponse.statusCode, 201);
  assert.equal(createResponse.payload.read, false);

  const readResponse = await executeRoute(notificationsRoutes, '/:id/read', 'patch', {
    headers: {
      authorization: `Bearer ${token}`
    },
    params: {
      id: String(createResponse.payload.id)
    }
  });

  assert.equal(readResponse.statusCode, 200);
  assert.equal(readResponse.payload.read, true);
});

test('rota de compras deve criar estoque e rota de vendas deve baixar estoque', { concurrency: false }, async () => {
  await resetDatabase();
  const token = await registerAndLogin('inventory-routes@example.com');

  const purchaseResponse = await executeRoute(purchasesRoutes, '/', 'post', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      item: 'Racao premium',
      category: 'piscicultura',
      date: '2026-05-17',
      quantity: 5,
      unitPrice: 12,
      stock: 5,
      minStock: 2,
      notes: 'Entrada inicial'
    }
  });

  assert.equal(purchaseResponse.statusCode, 201);

  const supplyAfterPurchase = await db.findOne(
    'supplies',
    (item) => item.product === 'Racao premium' && item.domain === 'piscicultura'
  );
  assert.equal(supplyAfterPurchase?.stock, 5);

  const saleResponse = await executeRoute(salesRoutes, '/', 'post', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: {
      produto: 'Racao premium',
      categoria: 'piscicultura',
      quantidade: 3,
      valor_unitario: 18,
      data_venda: '2026-05-17',
      cliente: 'Cliente teste',
      observacoes: 'Baixa de estoque'
    }
  });

  assert.equal(saleResponse.statusCode, 201);

  const supplyAfterSale = await db.findOne(
    'supplies',
    (item) => item.product === 'Racao premium' && item.domain === 'piscicultura'
  );
  assert.equal(supplyAfterSale?.stock, 2);
});
