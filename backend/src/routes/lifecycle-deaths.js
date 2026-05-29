import { createCollectionRouter } from './_collection.js';
import { optionalString, requireDate, requireNumber, requireString } from '../lib/validators.js';

function normalizeLifecycleDeath(body, user, current = {}) {
  return {
    unitId: optionalString(body?.unitId ?? current.unitId, { max: 80 }),
    unitSlug: requireString(body?.unitSlug ?? current.unitSlug, 'unitSlug', { min: 2, max: 120 }),
    unitName: requireString(body?.unitName ?? current.unitName, 'unitName', { min: 2, max: 190 }),
    category: requireString(body?.category ?? current.category, 'category', { min: 2, max: 60 }),
    animal_id: requireNumber(body?.animal_id ?? current.animal_id, 'animal_id', { min: 1 }),
    animal_codigo: requireString(body?.animal_codigo ?? current.animal_codigo, 'animal_codigo', { min: 2, max: 120 }),
    data_obito: requireDate(body?.data_obito ?? current.data_obito, 'data_obito'),
    causa_obito: requireString(body?.causa_obito ?? current.causa_obito, 'causa_obito', { min: 2, max: 160 }),
    categoria_causa: requireString(body?.categoria_causa ?? current.categoria_causa, 'categoria_causa', { min: 2, max: 120 }),
    observacoes_obito: optionalString(body?.observacoes_obito ?? current.observacoes_obito, { max: 3000 }),
    rawFields: body?.rawFields && typeof body.rawFields === 'object' ? body.rawFields : current.rawFields || {},
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'lifecycleDeaths',
  validateCreate: (body, user) => normalizeLifecycleDeath(body, user),
  validateUpdate: (body, user, current) => normalizeLifecycleDeath(body, user, current)
});
