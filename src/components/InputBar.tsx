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
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleVoiceResult = (transcript: string) => {
    onChange(value + ' ' + transcript);
  };

  const { isRecording, startRecording, stopRecording, isSupported } =
    useSpeechRecognition(handleVoiceResult, onError);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [value]);

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
      <div className="bg-[#072e6a] border border-[#123e81] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
        {isSupported && (
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            className={`p-2 rounded-full transition-all duration-200 shrink-0 self-end mb-0.5 ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-[#2356a9] hover:text-white hover:bg-[#1e4e9c]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isRecording ? 'Остановить запись' : 'Голосовой ввод'}
          >
            <MicrophoneIcon />
          </button>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onEnterPress}
          placeholder="Ask whatever you want"
          disabled={isLoading}
          rows={1}
          className="grow bg-transparent text-[#f3f5f9] placeholder-[#a0b5d5] resize-none outline-none text-sm py-2 leading-relaxed disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="p-2 rounded-full bg-[#2356a9] text-white hover:bg-[#1e4e9c] transition-colors shrink-0 self-end mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerIcon /> : <SendIcon />}
        </button>
      </div>
    </form>
  );
};

export default InputBar;