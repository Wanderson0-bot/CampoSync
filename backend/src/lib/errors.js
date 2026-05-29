// Erro padronizado da aplicação. Assim conseguimos distinguir falhas
// esperadas de falhas inesperadas no middleware final.
export class AppError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function assert(condition, statusCode, message, details = null) {
  if (!condition) {
    throw new AppError(statusCode, message, details);
  }
}
