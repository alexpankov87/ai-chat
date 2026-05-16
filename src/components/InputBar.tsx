import React, { useRef, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import MicrophoneIcon from '../assets/icons/MicrophoneIcon';
import SendIcon from '../assets/icons/SendIcon';
import SpinnerIcon from '../assets/icons/SpinnerIcon';

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onError: (error: string) => void;
  hasApiKey: boolean;
}

const InputBar: React.FC<InputBarProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  onError,
  hasApiKey,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Добавление распознанного текста к текущему значению
  const handleVoiceResult = (transcript: string) => {
    onChange(value + ' ' + transcript);
  };

  const { isRecording, startRecording, stopRecording, isSupported } =
    useSpeechRecognition(handleVoiceResult, onError);

  // Автоматическая высота поля ввода
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [value]);

  // Отправка по Enter (без Shift)
  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
        {/* Голосовой ввод */}
        {isSupported && (
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            className={`p-2 rounded-full transition-all duration-200 shrink-0 self-end mb-0.5 ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isRecording ? 'Остановить запись' : 'Голосовой ввод'}
          >
            <MicrophoneIcon />
          </button>
        )}

        {/* Поле ввода */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onEnterPress}
          placeholder="Type your message here..."
          disabled={isLoading || !hasApiKey}
          rows={1}
          className="grow bg-transparent text-white placeholder-gray-500 resize-none outline-none text-sm py-2 leading-relaxed disabled:opacity-50"
        />

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={!value.trim() || isLoading || !hasApiKey}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shrink-0 self-end mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerIcon /> : <SendIcon />}
        </button>
      </div>
    </form>
  );
};

export default InputBar;