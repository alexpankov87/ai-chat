import 'dotenv/config';
import app from './app.js';
import config from './config/index.js';

// Точка входа — загружаем переменные окружения и запускаем сервер
const start = (): void => {
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`Health check: http://localhost:${config.port}/health`);
  });
};

start();