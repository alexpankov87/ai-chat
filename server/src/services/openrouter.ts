import config from '../config/index.js';

// Формат сообщения для OpenRouter API
interface MessageDTO {
  role: string;
  content: string;
}

// Ответ от AI-сервиса
interface OpenRouterResponse {
  content: string;
}

// Сервис для общения с OpenRouter
// Принимает массив сообщений, возвращает ответ модели
export const sendChatRequest = async (
  messages: MessageDTO[],
  signal?: AbortSignal
): Promise<OpenRouterResponse> => {
  const response = await fetch(config.openrouter.baseUrl, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.openrouter.apiKey}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'AI Chat',
    },
    body: JSON.stringify({
      model: config.openrouter.model,
      messages,
    }),
  });

  // Если API вернул ошибку — пробрасываем её выше
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errorBody}`);
  }

    const data = await response.json();
    return { content: data.choices[0].message.content };
};