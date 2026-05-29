export function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Rota nao encontrada.',
    path: req.originalUrl
  });
}
