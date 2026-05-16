import type { Request, Response } from 'express';
import { sendChatRequest } from '../services/openrouter.js';

// Контроллер для обработки чат-запросов
// Принимает сообщение от клиента, отправляет в OpenRouter, возвращает ответ
export const handleChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message } = req.body;

  try {
    const { content } = await sendChatRequest([
      { role: 'user', content: message },
    ]);
    res.json({ response: content });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Chat error:', errorMessage);
    res.status(502).json({ error: 'Failed to get response from AI service' });
  }
};