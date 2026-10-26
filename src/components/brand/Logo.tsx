import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  subtitle?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 36,
  showText = true,
  subtitle
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Abstract Shelter-Heart Glyph */}
      <div 
        className="relative flex items-center justify-center rounded-2xl p-1.5 transition-transform hover:scale-105"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #EFF5F8 0%, #D8EBE9 100%)',
          boxShadow: '3px 4px 10px rgba(168, 186, 199, 0.35), -2px -2px 6px rgba(255, 255, 255, 0.95)'
        }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer Protective Shelter Arc (Left) */}
          <path
            d="M 12 30 C 10 22, 12 14, 24 10 C 26 9.3, 27 11, 26 13 C 16 17, 15 25, 17 32 C 18 35, 14 36, 12 30 Z"
            fill="url(#outerArcGrad)"
          />
          {/* Inner Protective Arc (Right, interlocking to form abstract warm heart) */}
          <path
            d="M 36 30 C 38 22, 36 14, 24 10 C 22 9.3, 21 11, 22 13 C 32 17, 33 25, 31 32 C 30 35, 34 36, 36 30 Z"
            fill="url(#innerArcGrad)"
          />
          {/* Center Cherished Dot (Child Safety Beacon) */}
          <circle cx="24" cy="24" r="3.5" fill="#D97759" />
          <circle cx="24" cy="24" r="5" stroke="#1C5A70" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 2" />

          <defs>
            <linearGradient id="outerArcGrad" x1="10" y1="10" x2="26" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1C5A70" />
              <stop offset="1" stopColor="#217E7B" />
            </linearGradient>
            <linearGradient id="innerArcGrad" x1="38" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#217E7B" />
              <stop offset="1" stopColor="#7FD5CE" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-bold tracking-tight text-[#172B3A] dark:text-[#F2F7F8] text-base leading-tight">
            Sontan Rokkha
          </span>
          <span className="text-xs font-medium text-[#40586B] dark:text-[#C3D4DD] leading-none">
            {subtitle || 'সন্তান রক্ষা'}
          </span>
        </div>
      )}
    </div>
  );
};
