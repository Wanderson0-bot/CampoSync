// Wrapper para evitar try/catch repetido em todas as rotas async.
export function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}
