'use client';

import React from 'react';
import Link from 'next/link';

interface SyntheticaButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
  badgeBg?: string;
  badgeTextColor?: string;
}

export const SyntheticaButton: React.FC<SyntheticaButtonProps> = ({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
  icon = '→',
  badgeBg = 'bg-cyan-400',
  badgeTextColor = 'text-black',
}) => {
  const content = (
    <div className={`relative inline-flex items-center group cursor-pointer select-none ${className}`}>
      {/* Outer Organic Peanut Frame Enclosure */}
      <div className="relative flex items-center p-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]">
        
        {/* Inner Left Pill Capsule */}
        <div className="px-6 py-3 rounded-full bg-[#111328]/90 group-hover:bg-[#181a38] text-white font-mono text-xs uppercase font-bold tracking-[0.2em] transition-colors whitespace-nowrap flex items-center justify-center">
          {children}
        </div>

        {/* Concave Bridge Divider / Pinch */}
        <div className="w-2.5 h-6 relative flex items-center justify-center -mx-1 z-10 pointer-events-none">
          <div className="w-full h-full opacity-30 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
        </div>

        {/* Inner Right Circle Badge */}
        <div
          className={`w-10 h-10 rounded-full ${badgeBg} ${badgeTextColor} group-hover:scale-110 transition-transform duration-300 flex items-center justify-center font-bold text-sm shrink-0 shadow-md`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className="text-left focus:outline-none">
      {content}
    </button>
  );
};
