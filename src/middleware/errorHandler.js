// 404 - no route matched - /auth/me
export function notFound(req, res) {
  res.status(404).json({ message: `Not found - ${req.originalUrl}` });
}

//central handler - for everything in the system
export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server Error" });
}
