import { db } from '../config/database.js';
import { AppError } from '../lib/errors.js';
import { verifyToken } from '../lib/security.js';

// Valida o token Bearer e carrega o usuário atual para a request.
export async function requireAuth(req, _res, next) {
  try {
    const authorization = req.headers.authorization || '';
    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new AppError(401, 'Envie um token Bearer valido.');
    }

    const payload = verifyToken(token);
    const user = await db.findOne('users', (entry) => entry.id === payload.sub);
    if (!user) {
      throw new AppError(401, 'Usuário autenticado não encontrado.');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
