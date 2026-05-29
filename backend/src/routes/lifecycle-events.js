import { createCollectionRouter } from './_collection.js';
import { optionalString, requireDate, requireNumber, requireString } from '../lib/validators.js';

function normalizeLifecycleEvent(body, user, current = {}) {
  return {
    unitId: optionalString(body?.unitId ?? current.unitId, { max: 80 }),
    unitSlug: requireString(body?.unitSlug ?? current.unitSlug, 'unitSlug', { min: 2, max: 120 }),
    unitName: requireString(body?.unitName ?? current.unitName, 'unitName', { min: 2, max: 190 }),
    category: requireString(body?.category ?? current.category, 'category', { min: 2, max: 60 }),
    animal_id: requireNumber(body?.animal_id ?? current.animal_id, 'animal_id', { min: 1 }),
    animal_codigo: requireString(body?.animal_codigo ?? current.animal_codigo, 'animal_codigo', { min: 2, max: 120 }),
    data_evento: requireDate(body?.data_evento ?? current.data_evento, 'data_evento'),
    tipo_evento: requireString(body?.tipo_evento ?? current.tipo_evento, 'tipo_evento', { min: 2, max: 120 }),
    fase_vida: optionalString(body?.fase_vida ?? current.fase_vida, { max: 120 }),
    descricao_evento: optionalString(body?.descricao_evento ?? current.descricao_evento, { max: 3000 }),
    rawFields: body?.rawFields && typeof body.rawFields === 'object' ? body.rawFields : current.rawFields || {},
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'lifecycleEvents',
  validateCreate: (body, user) => normalizeLifecycleEvent(body, user),
  validateUpdate: (body, user, current) => normalizeLifecycleEvent(body, user, current)
});
