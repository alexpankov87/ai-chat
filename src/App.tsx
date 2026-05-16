import { useState, useRef, useEffect, useCallback } from 'react';
import { useChatHistory } from './hooks/useChatHistory';
import { sendChatRequest } from './services/api';
import type { Message } from './types';
import SettingsIcon from './assets/icons/SettingsIcon';
import WarningBanner from './components/WarningBanner';
import WelcomeScreen from './components/WelcomeScreen';
import MessageBubble from './components/MessageBubble';
import InputBar from './components/InputBar';

function App() {
  const { messages, addMessage, clearHistory } = useChatHistory();
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setMessageText('');
    setIsLoading(true);
    setError('');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const { content } = await sendChatRequest({
        message: trimmed,
        signal: controller.signal,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        timestamp: Date.now(),
      };

      addMessage(assistantMessage);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Превышено время ожидания. Попробуйте ещё раз.');
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
        setError(errorMessage);
      }
      setTimeout(() => setError(''), 5000);
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const handleError = useCallback((errMsg: string) => {
    setError(errMsg);
    setTimeout(() => setError(''), 5000);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Верхняя панель */}
      <header className="bg-[#072e6a] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Иконка диалога вместо текста AI Chat */}
          <div className="w-8 h-8 rounded-full bg-[#072e6a] flex items-center justify-center">
         
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearHistory}
              className="p-2 text-[#a0b5d5] hover:text-red-400 hover:bg-[#1e4e9c] rounded-lg transition-colors text-sm"
              title="Очистить историю"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
          <button
            className="p-2 text-[#a0b5d5] hover:text-white hover:bg-[#1e4e9c] rounded-lg transition-colors"
            title="Настройки"
          >
            <SettingsIcon />
          </button>
        </div>
      </header>

      {/* История сообщений */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="space-y-1">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Поле ввода */}
      <footer className="px-4 py-3">
        <div className="max-w-3xl mx-auto space-y-3">
          {error && <WarningBanner message={error} />}

          <InputBar
            value={messageText}
            onChange={setMessageText}
            onSubmit={sendMessage}
            isLoading={isLoading}
            onError={handleError}
            hasApiKey={true}
          />
        </div>
      </footer>
    </div>
  );
}

export default App;