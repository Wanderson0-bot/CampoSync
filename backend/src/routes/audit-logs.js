import express from 'express';
import { db } from '../config/database.js';
import { AppError } from '../lib/errors.js';
import { asyncHandler } from '../lib/http.js';
import { optionalString, requireDate, requireString } from '../lib/validators.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

function normalizeAuditLog(body, user, current = {}) {
  const now = new Date();
  const fallbackDate = now.toISOString().slice(0, 10);
  const fallbackTime = now.toISOString().slice(11, 16);

  return {
    type: requireString(body?.type ?? current.type, 'type', { max: 80 }),
    title: requireString(body?.title ?? current.title, 'title', { max: 200 }),
    details: optionalString(body?.details ?? current.details, { max: 2000 }),
    area: optionalString(body?.area ?? current.area, { max: 160, fallback: 'Sistema' }),
    status: optionalString(body?.status ?? current.status, { max: 80, fallback: 'Concluido' }),
    date: requireDate(body?.date ?? current.date ?? fallbackDate, 'date'),
    time: requireString(body?.time ?? current.time ?? fallbackTime, 'time', { min: 4, max: 5 }),
    user: requireString(body?.user ?? current.user ?? user?.email ?? 'Sistema', 'user', { max: 190 }),
    source: optionalString(body?.source ?? current.source, { max: 80, fallback: 'frontend' }),
    entityType: optionalString(body?.entityType ?? current.entityType, { max: 80 }),
    entityId: optionalString(body?.entityId ?? current.entityId, { max: 80 }),
    metadata: body?.metadata ?? current.metadata ?? {},
    updatedAt: now.toISOString(),
    updatedBy: user?.email || current.updatedBy || 'system@camposync.local',
    createdAt: current.createdAt || now.toISOString(),
    createdBy: current.createdBy || user?.email || 'system@camposync.local'
  };
}

router.get('/', requireAuth,

  asyncHandler(async (req, res) => {

    const page  = Math.max(1, Number(req.query.page)  || 1);

    const limit = Math.min(100, Number(req.query.limit) || 50);

    const all   = await db.list('auditLogs');

    const start = (page - 1) * limit;

    res.json({

      data: all.slice(start, start + limit),

      total: all.length, page, limit

    });

  })

);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const item = await db.getById('auditLogs', req.params.id);
    if (!item) {
      throw new AppError(404, 'Registro nao encontrado.');
    }

    res.json(item);
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const payload = normalizeAuditLog(req.body, req.user);
    const created = await db.create('auditLogs', payload);
    res.status(201).json(created);
  })
);

export default router;
