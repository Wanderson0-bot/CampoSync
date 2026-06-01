import { createCollectionRouter } from './_collection.js';
import { AppError } from '../lib/errors.js';
import {
  optionalString,
  requireNumber,
  requireString
} from '../lib/validators.js';

export const FERRAMENTA_STATUS = [
  'Disponivel',
  'Em manutencao',
  'Indisponivel'
];

function normalizeFerramentaStatus(value) {
  const normalized = requireString(value, 'status');

  const simplified = normalized
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (simplified === 'disponivel') {
    return FERRAMENTA_STATUS[0];
  }

  if (simplified === 'em manutencao') {
    return FERRAMENTA_STATUS[1];
  }

  if (simplified === 'quebrado' || simplified === 'indisponivel') {
    return FERRAMENTA_STATUS[2];
  }

  throw new AppError(400, 'Status de ferramenta invalido.');
}

function normalizeFerramenta(body, user, current = {}) {
  return {
    ferramenta: requireString(
      body?.ferramenta ?? current.ferramenta,
      'ferramenta'
    ),

    categoria: requireString(
      body?.categoria ?? current.categoria,
      'categoria'
    ),

    quantidade: requireNumber(
      body?.quantidade ?? current.quantidade,
      'quantidade',
      { min: 1 }
    ),

    status: normalizeFerramentaStatus(
      body?.status ?? current.status
    ),

    dominio: optionalString(
      body?.dominio ?? current.dominio,
      { max: 120 }
    ),

    ultima_inspecao: optionalString(
      body?.ultima_inspecao ?? current.ultima_inspecao,
      { max: 10 }
    ),

    observacoes: optionalString(
      body?.observacoes ?? current.observacoes,
      { max: 600 }
    ),

    updatedAt: new Date().toISOString(),
    updatedBy: user.email,

    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'tools',

  validateCreate: (body, user) =>
    normalizeFerramenta(body, user),

  validateUpdate: (body, user, current) =>
    normalizeFerramenta(body, user, current),

  allowDelete: true
});