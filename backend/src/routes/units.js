import express from 'express';
import { db } from '../config/database.js';
import { AppError } from '../lib/errors.js';
import { asyncHandler } from '../lib/http.js';
import { requireAuth } from '../middlewares/auth.js';
import { optionalNumber, optionalString, requireString } from '../lib/validators.js';

const router = express.Router();

const DEFAULT_UNITS = [
  { id: 1, name: 'Suinocultura', slug: 'suinocultura', pageSlug: 'suinocultura', category: 'animal', tipo: 'animal', image: 'imagens/Suinocultura.jpg' },
  { id: 2, name: 'Avicultura', slug: 'avicultura', pageSlug: 'avicultura', category: 'animal', tipo: 'animal', image: 'imagens/Avicultura.jpg' },
  { id: 3, name: 'Piscicultura', slug: 'piscicultura', pageSlug: 'piscicultura', category: 'animal', tipo: 'animal', image: 'imagens/Piscicultura.jpg' },
  { id: 4, name: 'Horticultura', slug: 'horticultura', pageSlug: 'horticultura', category: 'planta', tipo: 'planta', image: 'imagens/horticultura.jpg' },
  { id: 5, name: 'Fruticultura', slug: 'fruticultura', pageSlug: 'fruticultura', category: 'planta', tipo: 'planta', image: 'imagens/Fruticultura.jpg' },
  { id: 6, name: 'Agrofloresta', slug: 'agrofloresta', pageSlug: 'agrofloresta', category: 'planta', tipo: 'planta', image: 'imagens/Agrofloresta.jpg' },
  { id: 7, name: 'Plantas Forrageiras', slug: 'plantas-forrageiras', pageSlug: 'plantas-forrageiras', category: 'planta', tipo: 'planta', image: 'imagens/Plantas Forrageiras.jpg' },
  { id: 8, name: 'Cultivos de Sequeiro', slug: 'cultivos-de-sequeiro', pageSlug: 'cultivos-de-sequeiro', category: 'planta', tipo: 'planta', image: 'imagens/Cultivo-de-Siqueiro.jpg' },
  { id: 9, name: 'Plantas Ornamentais', slug: 'plantas-ornamentais', pageSlug: 'plantas-ornamentais', category: 'planta', tipo: 'planta', image: 'imagens/Plantas-Ornamentais.jpg' },
  { id: 10, name: 'Plantas Medicinais', slug: 'plantas-medicinais', pageSlug: 'plantas-medicinais', category: 'planta', tipo: 'planta', image: 'imagens/Plantas-medicinais.jpg' },
  { id: 11, name: 'Viveiros de Mudas', slug: 'viveiros-de-mudas', pageSlug: 'viveiros-de-mudas', category: 'planta', tipo: 'planta', image: 'imagens/mudas.jpg' }
].map((unit) => ({
  ...unit,
  lifecycleEnabled: unit.category === 'animal',
  isDefault: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  createdBy: 'system',
  updatedAt: '2026-01-01T00:00:00.000Z',
  updatedBy: 'system'
}));

function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || `unidade-${Date.now()}`;
}

function normalizeCategory(value = '') {
  const normalized = String(value || '').toLowerCase().trim();
  if (normalized === 'animal') return 'animal';
  if (normalized === 'planta' || normalized === 'plantas' || normalized === 'flora' || normalized === 'floras') return 'planta';
  throw new AppError(400, "Use 'animal', 'planta' ou 'flora'.");
}

function normalizeUnit(body, user, current = {}) {
  const name = requireString(body?.name ?? body?.nome ?? current.name ?? current.nome, 'nome');
  const category = normalizeCategory(body?.category ?? body?.categoria ?? body?.tipo ?? current.category ?? current.categoria ?? current.tipo);
  const isDefaultUnit = Boolean(current.isDefault);
  const slug = isDefaultUnit
    ? requireString(current.slug, 'slug')
    : optionalString(body?.slug ?? current.slug, { max: 100 }) || slugify(name);
  const pageSlug = isDefaultUnit
    ? requireString(current.pageSlug || current.slug, 'pageSlug')
    : optionalString(body?.pageSlug ?? current.pageSlug, { max: 100 }) || 'unidade_produtiva';
  const lat = optionalNumber(body?.lat ?? body?.latitude ?? current.lat ?? current.latitude, { min: -90, max: 90, fallback: null });
  const lng = optionalNumber(body?.lng ?? body?.longitude ?? current.lng ?? current.longitude, { min: -180, max: 180, fallback: null });
  const hasCoordinates = lat != null && lng != null;

  return {
    ...current,
    name,
    nome: name,
    slug,
    pageSlug,
    category,
    categoria: category,
    tipo: category,
    lifecycleEnabled: category === 'animal',
    image: optionalString(body?.image ?? body?.imagem ?? current.image, { max: 250000 }),
    descricao: optionalString(body?.descricao ?? current.descricao, { max: 500 }),
    responsavel: optionalString(body?.responsavel ?? current.responsavel, { max: 120, fallback: user.email }),
    lat: hasCoordinates ? lat : null,
    lng: hasCoordinates ? lng : null,
    latitude: hasCoordinates ? lat : null,
    longitude: hasCoordinates ? lng : null,
    coords: hasCoordinates ? [lat, lng] : null,
    coors: hasCoordinates ? [lat, lng] : null,
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email,
    isDefault: Boolean(current.isDefault)
  };
}

export async function ensureDefaultUnits() {
  const currentUnits = await db.list('customUnits');
  const currentSlugs = new Set(currentUnits.map((unit) => String(unit.slug || '').toLowerCase()));
  const missingDefaults = DEFAULT_UNITS.filter((unit) => !currentSlugs.has(unit.slug));

  for (const unit of missingDefaults) {
    await db.create('customUnits', unit);
  }
}

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    await ensureDefaultUnits();
    const units = await db.list('customUnits');
    res.json(units);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    await ensureDefaultUnits();
    const units = await db.list('customUnits');
    const lookup = String(req.params.id).toLowerCase();
    const item = units.find((unit) => String(unit.id) === lookup || String(unit.slug || '').toLowerCase() === lookup);

    if (!item) {
      throw new AppError(404, 'Unidade não encontrada.');
    }

    res.json(item);
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const payload = normalizeUnit(req.body, req.user);
    const created = await db.create('customUnits', payload);
    res.status(201).json(created);
  })
);

router.put(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const updated = await db.update('customUnits', req.params.id, (current) => normalizeUnit(req.body, req.user, current));
    if (!updated) {
      throw new AppError(404, 'Unidade não encontrada.');
    }

    res.json(updated);
  })
);

router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const current = await db.getById('customUnits', req.params.id);
    if (!current) {
      throw new AppError(404, 'Unidade não encontrada.');
    }

    if (current.isDefault) {
      throw new AppError(400, 'As unidades padrão não podem ser removidas.');
    }

    const removed = await db.remove('customUnits', req.params.id);
    res.json({ message: 'Unidade removida com sucesso.', item: removed });
  })
);

export default router;
