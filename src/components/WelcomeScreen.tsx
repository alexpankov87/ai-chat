import React from 'react';
import ChatIcon from '../assets/icons/ChatIcon';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 pt-24">
      {/* Иконка */}
      <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
        <ChatIcon />
      </div>

      {/* Заголовок */}
      <h1 className="text-2xl font-semibold text-white mb-2">
        Welcome to AI Chat
      </h1>

      {/* Подзаголовок */}
      <p className="text-gray-400 text-center max-w-md text-sm leading-relaxed">
        Start a conversation with GPT-4o and explore the power of AI.
        Type your message below to begin.
      </p>
    </div>
  );
};

export default WelcomeScreen;