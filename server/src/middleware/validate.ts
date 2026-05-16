import type { Request, Response, NextFunction } from 'express';

// Проверяем, что в теле запроса есть непустое сообщение
export const validateChatRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ error: 'Message is required and must be a non-empty string' });
    return;
  }

  next();
};