import { AppError } from './errors.js';

function fail(message, details = null) {
  throw new AppError(400, message, details);
}

export function requireString(value, field, { min = 1, max = 200 } = {}) {
  const normalized = String(value ?? '').trim();
  if (normalized.length < min) fail(`O campo "${field}" e obrigatorio.`);
  if (normalized.length > max) fail(`O campo "${field}" excede o tamanho permitido.`);
  return normalized;
}

export function optionalString(value, { max = 500, fallback = '' } = {}) {
  if (value == null || value === '') return fallback;
  const normalized = String(value).trim();
  if (normalized.length > max) fail('Texto excede o tamanho permitido.');
  return normalized;
}

export function requireNumber(value, field, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) fail(`O campo "${field}" precisa ser numerico.`);
  if (numeric < min) fail(`O campo "${field}" precisa ser maior ou igual a ${min}.`);
  if (numeric > max) fail(`O campo "${field}" excede o limite permitido.`);
  return numeric;
}

export function optionalNumber(value, { min = 0, max = Number.MAX_SAFE_INTEGER, fallback = 0 } = {}) {
  if (value == null || value === '') return fallback;
  return requireNumber(value, 'numero', { min, max });
}

export function optionalBoolean(value, fallback = false) {
  if (value == null) return fallback;
  return Boolean(value);
}

export function requireDate(value, field) {
  const normalized = String(value ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    fail(`O campo "${field}" precisa estar no formato YYYY-MM-DD.`);
  }
  return normalized;
}

export function optionalDate(value, fallback = '') {
  if (!value) return fallback;
  return requireDate(value, 'data');
}

export function requireEmail(value) {
  const email = String(value ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fail('Informe um e-mail valido.');
  }
  return email;
}

export function requirePassword(value) {
  const password = String(value ?? '');
  if (password.length < 8) {
    fail('A senha precisa ter pelo menos 8 caracteres.');
  }
  return password;
}
