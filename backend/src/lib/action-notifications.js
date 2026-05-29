import { db } from '../config/database.js';

function normalizeTime(value = '') {
  return String(value || '').trim().slice(0, 5);
}

function getDueDateTime(action) {
  const date = String(action?.data_acao || '').trim();
  const time = normalizeTime(action?.hora_acao);
  if (!date || !time) {
    return null;
  }

  const dueAt = new Date(`${date}T${time}:00Z`);
  return Number.isNaN(dueAt.getTime()) ? null : dueAt;
}

function buildNotificationTitle(action) {
  return `Ação programada: ${action.acao}`;
}

function buildNotificationMessage(action) {
  const performerName = String(
    action.performerName || action.createdBy || 'Responsável não informado'
  ).trim();

  return `${action.acao} na unidade ${action.unidade} chegou no horário programado. ` +
    `Responsável: ${performerName}. ${String(action.detalhes_acao || 'Sem observações adicionais.').trim()}`;
}

export async function processDueActionNotifications() {
  const actions = await db.list('actions');
  const notifications = await db.list('notifications');
  const now = new Date();

  for (const action of actions) {
    if (action.notificationSentAt) {
      continue;
    }

    const dueAt = getDueDateTime(action);
    if (!dueAt || dueAt.getTime() > now.getTime()) {
      continue;
    }

    const title = buildNotificationTitle(action);
    const message = buildNotificationMessage(action);
    const alreadyExists = notifications.some((notification) => (
      notification.title === title && notification.message === message
    ));

    if (!alreadyExists) {
      const createdNotification = await db.create('notifications', {
        title,
        message,
        time: normalizeTime(action.hora_acao) || now.toISOString().slice(11, 16),
        read: false
      });
      notifications.unshift(createdNotification);
    }

    await db.update('actions', action.id, (current) => ({
      ...current,
      notificationSentAt: new Date().toISOString()
    }));
  }
}
