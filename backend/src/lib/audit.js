import { db } from '../config/database.js';

export async function writeAuditLog(entry = {}, userEmail = 'system@camposync.local') {
  const now = new Date();
  const record = {
    type: String(entry.type || 'Sistema').trim() || 'Sistema',
    title: String(entry.title || 'Evento do sistema').trim() || 'Evento do sistema',
    details: String(entry.details || '').trim(),
    area: String(entry.area || 'Sistema').trim() || 'Sistema',
    status: String(entry.status || 'Concluido').trim() || 'Concluido',
    date: String(entry.date || now.toISOString().slice(0, 10)).trim(),
    time: String(entry.time || now.toISOString().slice(11, 16)).trim(),
    user: String(entry.user || userEmail).trim() || userEmail,
    source: String(entry.source || 'backend').trim() || 'backend',
    entityType: String(entry.entityType || '').trim(),
    entityId: entry.entityId == null ? '' : String(entry.entityId).trim(),
    metadata: entry.metadata && typeof entry.metadata === 'object' ? entry.metadata : {},
    updatedAt: now.toISOString(),
    updatedBy: userEmail,
    createdAt: now.toISOString(),
    createdBy: userEmail
  };

  try {
    await db.create('auditLogs', record);
  } catch (error) {
    console.error('Falha ao registrar log de auditoria:', error);
  }
}
