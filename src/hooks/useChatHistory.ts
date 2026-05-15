import { useState, useCallback } from 'react';
import type { Message } from '../types';

const STORAGE_KEY = 'ai-chat-history';

// Загружаем историю из localStorage
const loadHistory = (): Message[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Сохраняем историю в localStorage
const saveHistory = (messages: Message[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Ничего не делаем, если localStorage переполнен
  }
};

export const useChatHistory = () => {
  const [messages, setMessages] = useState<Message[]>(loadHistory);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => {
      const updated = [...prev, message];
      saveHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, addMessage, clearHistory };
};