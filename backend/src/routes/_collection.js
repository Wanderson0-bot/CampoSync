import express from 'express';
import { db } from '../config/database.js';
import { AppError } from '../lib/errors.js';
import { asyncHandler } from '../lib/http.js';
import { requireAuth } from '../middlewares/auth.js';

// Fábrica para coleções simples. Ela evita duplicação sem esconder o fluxo:
// listagem publica, leitura por id e operacoes mutaveis protegidas.
export function createCollectionRouter({
  collection,
  validateCreate,
  validateUpdate,
  afterCreate,
  afterUpdate,
  afterDelete,
  allowPublicRead = true,
  allowDelete = true
}) {
  const router = express.Router();
  const readMiddlewares = allowPublicRead
    ? []
    : [requireAuth];

  router.get(
    '/',
    ...readMiddlewares,
    asyncHandler(async (_req, res) => {
      const items = await db.list(collection);
      res.json(items);
    })
  );

  router.get(
    '/:id',
    ...readMiddlewares,
    asyncHandler(async (req, res) => {
      const item = await db.getById(collection, req.params.id);
      if (!item) {
        throw new AppError(404, 'Registro não encontrado.');
      }

      res.json(item);
    })
  );

  router.post(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
      // Se o db expõe a writeQueue, usar:
      const created = await (db.atomicWrite || ((callback) => callback()))(async () => {

        const payload = await validateCreate(req.body, req.user);

        const created = await db.create(collection, payload);

        if (afterCreate) {
          await afterCreate(created, req);
        }

        return created;
      });
      res.status(201).json(created);
    })
  );

  router.put(
    '/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
      const current = await db.getById(collection, req.params.id);
      if (!current) {
        throw new AppError(404, 'Registro nao encontrado.');
      }

      const nextPayload = await validateUpdate(req.body, req.user, current);
      const updated = await db.update(collection, req.params.id, () => nextPayload);
      if (!updated) {
        throw new AppError(404, 'Registro nao encontrado.');
      }
      try {
        if (afterUpdate) {
          await afterUpdate(updated, current, req);
        }
      } catch (error) {
        await db.update(collection, req.params.id, () => current);
        throw error;
      }

      res.json(updated);
    })
  );

  if (allowDelete) {
    router.delete(
      '/:id',
      requireAuth,
      asyncHandler(async (req, res) => {
        const current = await db.getById(collection, req.params.id);
        if (!current) {
          throw new AppError(404, 'Registro nao encontrado.');
        }
        if (afterDelete) {
          await afterDelete(current, req);
        }
        const removed = await db.remove(collection, req.params.id);
        if (!removed) {
          throw new AppError(404, 'Registro nao encontrado.');
        }

        res.json({ message: 'Registro removido com sucesso.', item: removed });
      })
    );
  }

  return router;
}
