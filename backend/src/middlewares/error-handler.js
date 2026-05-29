import { AppError } from '../lib/errors.js';

export function errorHandler(error, _req, res, _next) {
  const statusCode = error instanceof AppError
    ? error.statusCode
    : Number(error?.statusCode || error?.status || 500);

  if (statusCode >= 500) {
    console.error('Erro interno na API:', error);
  }

  res.status(statusCode).json({
    error: statusCode === 413
      ? 'A imagem enviada excede o limite permitido pelo servidor.'
      : (error.message || 'Erro interno do servidor.'),
    details: error instanceof AppError ? error.details : null
  });
}
