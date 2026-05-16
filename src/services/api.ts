// URL бэкенда. Берём из переменной окружения или используем localhost для разработки
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Параметры запроса к нашему бэкенду
interface ApiRequestParams {
  message: string;
  signal?: AbortSignal;
}

// Ответ от бэкенда
interface ApiResponse {
  content: string;
}

// Отправка сообщения через наш сервер
// Фронтенд не знает про OpenRouter — все детали на бэкенде
export const sendChatRequest = async ({
  message,
  signal,
}: ApiRequestParams): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  // Если сервер вернул ошибку — показываем что пошло не так
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Ошибка сервера ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  return { content: data.response };
};