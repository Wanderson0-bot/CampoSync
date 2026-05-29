import crypto from 'crypto';
import { promisify } from 'util';
import { env } from '../config/env.js';
import { AppError } from './errors.js';

const scrypt = promisify(crypto.scrypt);

function encodeBase64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function decodeBase64Url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

// Gera hash com salt único por usuário, evitando guardar senha em texto puro.
export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${Buffer.from(derivedKey).toString('hex')}`;
}

export async function verifyPassword(password, storedHash) {
  const [salt, hash] = String(storedHash || '').split(':');
  if (!salt || !hash) return false;

  const derivedKey = await scrypt(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  const received = Buffer.from(derivedKey);

  if (expected.length !== received.length) return false;
  return crypto.timingSafeEqual(expected, received);
}

function sign(value) {
  return crypto.createHmac('sha256', env.appSecret).update(value).digest('base64url');
}

// Token leve no formato "header.payload.signature", assinado por HMAC.
// Não depende de biblioteca externa e ainda permite expiração e validação.
export function createToken(payload) {
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + env.tokenTtlHours * 60 * 60
  };

  const header = encodeBase64Url(JSON.stringify({ alg: 'HS256', typ: 'CAMPOSYNC' }));
  const body = encodeBase64Url(JSON.stringify(tokenPayload));
  const signature = sign(`${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token) {
  const [header, body, signature] = String(token || '').split('.');
  if (!header || !body || !signature) {
    throw new AppError(401, 'Token invalido.');
  }

  const expectedSignature = sign(`${header}.${body}`);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);

  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    throw new AppError(401, 'Assinatura do token inválida.');
  }

  const payload = JSON.parse(decodeBase64Url(body));
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    throw new AppError(401, 'Token expirado.');
  }

  return payload;
}
