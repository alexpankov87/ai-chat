import cors from 'cors';

// Разрешённые источники запросов
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://ai-chat-nine-ecru.vercel.app',
];

// Настройка CORS — пускаем только запросы с нашего фронтенда
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // В разработке origin может быть undefined (Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
});