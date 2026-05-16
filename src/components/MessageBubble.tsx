import React, { useState } from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div
        className={`group relative max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isUser
            ? 'bg-[#2356a9] text-[#f3f5f9] rounded-br-md'
            : 'bg-[#123e81] text-[#f3f5f9] rounded-bl-md'
        }`}
        onClick={handleCopy}
        title="Нажмите, чтобы скопировать"
      >
        {message.content}

        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1e4e9c] text-white text-xs px-2 py-1 rounded-lg transition-opacity duration-200 pointer-events-none ${
            copied ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Скопировано!
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-4 h-4 text-[#a0b5d5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;