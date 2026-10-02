'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onFinish?: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 2400,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 700);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onFinish) onFinish();
        }, 600);
      }}
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-102 pointer-events-none blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-6 max-w-2xl px-6">
        {/* Derby Synthetic Star Logo */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
          <Image
            src="/derby-synthetic.svg"
            alt="Derby Synthetica"
            width={110}
            height={110}
            priority
            className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(212,181,255,0.6)]"
          />
        </div>

        {/* Title in Audiowide Font */}
        <h1
          style={{ fontFamily: 'var(--font-audiowide), "Audiowide", cursive, sans-serif' }}
          className="text-2xl sm:text-4xl md:text-5xl font-normal text-white uppercase tracking-[0.2em] leading-none pt-2"
        >
          DERBY SYNTHETICA
        </h1>

        {/* Subtitle in Magenta */}
        <p className="font-mono text-xs sm:text-sm text-[#FF2E97] tracking-[0.3em] uppercase font-medium">
          TEMPORADA 47 – FLAT TRACK
        </p>
      </div>
    </div>
  );
};
