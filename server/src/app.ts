import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import chatRouter from './routes/chat.js';

const app = express();

// Логирование всех входящих запросов
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Глобальные middleware
app.use(corsMiddleware);
app.use(express.json());

// Роуты
app.use(chatRouter);

// Health check — проверка, что сервер жив
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Обработчик ошибок всегда последний
app.use(errorHandler);

export default app;