import { env } from '../config/env.js';
import { AppError } from '../lib/errors.js';

const buckets = new Map();

const cleanupTimer = setInterval(() => {

  const now = Date.now();

  for (const [key, entry] of buckets) {

    if (now > entry.expiresAt) {

      buckets.delete(key);

    }

  }

}, 5 * 60 * 1000); // limpa a cada 5 min

if (typeof cleanupTimer.unref === 'function') {
  cleanupTimer.unref();
}

function getBucketKey(req, scope) {
  return `${scope}:${req.ip || req.socket.remoteAddress || 'unknown'}`;
}

// Rate limit em memória para reduzir brute force e abuso de rotas sensíveis.
export function rateLimit({ scope = 'global', max = env.requestLimitMax, windowMs = env.requestLimitWindowMs } = {}) {
  return (req, _res, next) => {
    const now = Date.now();
    const key = getBucketKey(req, scope);
    const entry = buckets.get(key);

    if (!entry || now > entry.expiresAt) {
      buckets.set(key, { count: 1, expiresAt: now + windowMs });
      return next();
    }

    if (entry.count >= max) {
      return next(new AppError(429, 'Limite de requisicoes excedido. Tente novamente mais tarde.'));
    }

    entry.count += 1;
    next();
  };
}
