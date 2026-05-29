import { createCollectionRouter } from './_collection.js';
import { optionalString, requireDate, requireString } from '../lib/validators.js';

function normalizeActionTime(value) {
  return String(value || '').trim().slice(0, 5);
}

function normalizeAction(body, user, current = {}) {
  const acao = requireString(body?.acao ?? current.acao, 'acao');
  const unidade = requireString(body?.unidade ?? current.unidade, 'unidade');
  const performerName = optionalString(body?.performerName ?? current.performerName, { max: 190 });
  const data_acao = requireDate(body?.data_acao ?? current.data_acao, 'data_acao');
  const hora_acao = requireString(normalizeActionTime(body?.hora_acao ?? current.hora_acao), 'hora_acao', { min: 4, max: 5 });
  const detalhes_acao = optionalString(body?.detalhes_acao ?? current.detalhes_acao, { max: 600 });
  const scheduleChanged =
    acao !== current.acao ||
    unidade !== current.unidade ||
    performerName !== current.performerName ||
    data_acao !== current.data_acao ||
    hora_acao !== current.hora_acao ||
    detalhes_acao !== current.detalhes_acao;

  return {
    acao,
    unidade,
    performerName,
    data_acao,
    hora_acao,
    detalhes_acao,
    notificationSentAt: scheduleChanged ? '' : (current.notificationSentAt || ''),
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'actions',
  validateCreate: (body, user) => normalizeAction(body, user),
  validateUpdate: (body, user, current) => normalizeAction(body, user, current)
});
