import React from 'react';

interface TansoLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showSubtitle?: boolean;
}

export const TansoLogo: React.FC<TansoLogoProps> = ({ 
  variant = 'light', 
  className = 'h-9',
  showSubtitle = true
}) => {
  const isDarkBg = variant === 'light'; // Text is white on dark background

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Symbol Icon */}
      <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
        {/* Teal Diamond Base */}
        <div className="absolute inset-0 bg-[#04AF9D] rotate-45 rounded-sm shadow-sm transition-transform duration-300 hover:scale-105" />
        {/* Orange Center Core */}
        <div className="relative z-10 w-4 h-4 bg-[#F6852D] rounded-full flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none font-black tracking-tight text-lg sm:text-xl">
          <span className={isDarkBg ? 'text-white' : 'text-[#0F1514]'}>
            TANSO
          </span>
          <span className="text-[#04AF9D]">
            SOLAR
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#F6852D] uppercase mt-0.5">
            SOLAR ENERGY
          </span>
        )}
      </div>
    </div>
  );
};
