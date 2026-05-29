import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/server.js';
import { notFoundHandler } from '../src/middlewares/not-found.js';

function createMockResponse() {
  return {
    statusCode: 200,
    payload: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    }
  };
}

function getAppRouteHandler(routePath, method) {
  const layer = app.router.stack.find((entry) => {
    return (
      entry.route?.path === routePath &&
      entry.route?.stack?.some((stackEntry) => stackEntry.method === method)
    );
  });

  if (!layer) {
    throw new Error(`Route ${method.toUpperCase()} ${routePath} not found.`);
  }

  return layer.route.stack.find((entry) => entry.method === method).handle;
}

test('GET /health deve retornar status ok', async () => {
  const response = createMockResponse();
  const handler = getAppRouteHandler('/health', 'get');

  await handler({}, response, (error) => {
    if (error) throw error;
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.status, 'ok');
});

test('rota inexistente deve retornar 404', async () => {
  const response = createMockResponse();
  notFoundHandler({ originalUrl: '/rota-inexistente' }, response);

  assert.equal(response.statusCode, 404);
  assert.equal(response.payload.error, 'Rota nao encontrada.');
});
