import { createCollectionRouter } from './_collection.js';
import { optionalString, requireDate, requireString } from '../lib/validators.js';

function normalizeLifecycleAnimal(body, user, current = {}) {
  const unitSlug = requireString(body?.unitSlug ?? current.unitSlug, 'unitSlug', { min: 2, max: 120 });

  return {
    unitId: optionalString(body?.unitId ?? current.unitId, { max: 80 }),
    unitSlug,
    unitName: requireString(body?.unitName ?? current.unitName, 'unitName', { min: 2, max: 190 }),
    category: requireString(body?.category ?? current.category, 'category', { min: 2, max: 60 }),
    codigo_animal: requireString(body?.codigo_animal ?? current.codigo_animal, 'codigo_animal', { min: 2, max: 120 }),
    data_nascimento: requireDate(body?.data_nascimento ?? current.data_nascimento, 'data_nascimento'),
    codigo_mae: optionalString(body?.codigo_mae ?? current.codigo_mae, { max: 120 }),
    codigo_pai: optionalString(body?.codigo_pai ?? current.codigo_pai, { max: 120 }),
    raca: optionalString(body?.raca ?? current.raca, { max: 160 }),
    sexo: optionalString(body?.sexo ?? current.sexo, { max: 60 }),
    fase: optionalString(body?.fase ?? current.fase, { max: 120, fallback: 'Em acompanhamento' }),
    baia: optionalString(body?.baia ?? current.baia, { max: 160 }),
    status: optionalString(body?.status ?? current.status, { max: 80, fallback: 'Ativo' }),
    observacoes: optionalString(body?.observacoes ?? current.observacoes, { max: 3000 }),
    rawFields: body?.rawFields && typeof body.rawFields === 'object' ? body.rawFields : current.rawFields || {},
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'lifecycleAnimals',
  validateCreate: (body, user) => normalizeLifecycleAnimal(body, user),
  validateUpdate: (body, user, current) => normalizeLifecycleAnimal(body, user, current)
});
