import { Router } from 'express';
import { handleChat } from '../controllers/chat.js';
import { validateChatRequest } from '../middleware/validate.js';

const router = Router();

// POST /api/chat — отправить сообщение и получить ответ от AI
router.post('/api/chat', validateChatRequest, handleChat);

export default router;