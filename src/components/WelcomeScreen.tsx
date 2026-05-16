import React from 'react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full px-4 pt-24">
      <div className="w-14 h-14 rounded-[10px] bg-[#1e4d9b] flex items-center justify-center mb-5">
        <svg className="w-7 h-7 text-[#f2f4f9]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </div>

      {/* Заголовок — по левому краю */}
      <h1 className="text-[48px] font-semibold text-[#f2f4f9] mb-2 text-left">
        Hi there! 
        <br />
        What would you like to know?
      </h1>

      {/* Подзаголовок — по левому краю */}
      <p className="text-[#a0b5d5] text-[22px] text-left max-w-md text-sm leading-relaxed">
        Use one of the most common prompts below or ask your own question
      </p>
    </div>
  );
};

export default WelcomeScreen;