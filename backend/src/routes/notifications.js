import express from 'express';
import { db } from '../config/database.js';
import { processDueActionNotifications } from '../lib/action-notifications.js';
import { AppError } from '../lib/errors.js';
import { asyncHandler } from '../lib/http.js';
import { optionalBoolean, optionalString, requireString } from '../lib/validators.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    await processDueActionNotifications();
    const notifications = await db.list('notifications');
    res.json(notifications);
  })
);

router.patch(
  '/:id/read',
  requireAuth,
  asyncHandler(async (req, res) => {
    const updated = await db.update('notifications', req.params.id, () => ({ read: true }));
    if (!updated) {
      throw new AppError(404, 'Notificacao nao encontrada.');
    }

    res.json(updated);
  })
);

router.patch(
  '/read-all',
  requireAuth,
  asyncHandler(async (_req, res) => {
    const notifications = await db.list('notifications');
    await Promise.all(notifications.map((item) => db.update('notifications', item.id, () => ({ read: true }))));
    res.json({ message: 'Notificacoes marcadas como lidas.' });
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const created = await db.create('notifications', {
      title: requireString(req.body?.title, 'title'),
      message: requireString(req.body?.message, 'message', { max: 400 }),
      time: optionalString(req.body?.time, { fallback: new Date().toISOString().slice(11, 16), max: 5 }),
      read: optionalBoolean(req.body?.read, false)
    });

    res.status(201).json(created);
  })
);

export default router;
