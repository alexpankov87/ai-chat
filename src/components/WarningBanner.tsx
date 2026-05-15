import React from 'react';
import WarningIcon from '../assets/icons/WarningIcon';

interface WarningBannerProps {
  message: string;
}

const WarningBanner: React.FC<WarningBannerProps> = ({ message }) => {
  return (
    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2.5 flex items-center gap-2 text-yellow-400 text-sm">
      <WarningIcon />
      <span>{message}</span>
    </div>
  );
};

export default WarningBanner;