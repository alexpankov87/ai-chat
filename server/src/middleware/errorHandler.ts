import type { Request, Response, NextFunction } from 'express';

// Централизованный обработчик ошибок
// Ловит всё, что упало в контроллерах или middleware
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Unhandled error:', err.message);

  res.status(500).json({
    error: 'Internal server error. Please try again later.',
  });
};