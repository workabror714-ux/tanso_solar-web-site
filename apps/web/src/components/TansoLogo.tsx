import React from 'react';

interface TansoLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showSubtitle?: boolean;
}

export const TansoLogo: React.FC<TansoLogoProps> = ({
  className = 'h-10',
  showSubtitle = false
}) => {
  const src = showSubtitle
    ? '/images/brand/tanso-logo-full.png'
    : '/images/brand/tanso-logo-header.png';

  return (
    <img
      src={src}
      alt="TANSO"
      className={`block w-auto object-contain select-none ${className}`}
      draggable={false}
    />
  );
};
