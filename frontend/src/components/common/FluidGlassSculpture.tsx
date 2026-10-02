'use client';

import React from 'react';
import Image from 'next/image';

interface FluidGlassSculptureProps {
  variant?: 'hero' | 'about' | 'capacete' | 'patins' | 'apito';
  imagePath?: string;
  className?: string;
  alt?: string;
}

export const FluidGlassSculpture: React.FC<FluidGlassSculptureProps> = ({
  variant = 'capacete',
  imagePath,
  className = '',
  alt = 'Derby Synthetica Asset',
}) => {
  // Determine image source based on variant or custom path
  let src = imagePath;
  if (!src) {
    if (variant === 'hero' || variant === 'capacete') {
      src = '/imagens/capacete.webp';
    } else if (variant === 'about' || variant === 'patins') {
      src = '/imagens/patins.webp';
    } else if (variant === 'apito') {
      src = '/imagens/apito.webp';
    } else {
      src = '/imagens/capacete.webp';
    }
  }

  return (
    <div className={`relative w-full flex items-center justify-center py-6 ${className}`}>
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full opacity-45 blur-[110px] pointer-events-none z-0"
        style={{
          background:
            variant === 'patins'
              ? 'radial-gradient(circle, #00F0FF 0%, #3B82F6 50%, transparent 80%)'
              : variant === 'apito'
              ? 'radial-gradient(circle, #A855F7 0%, #FF2E97 50%, transparent 80%)'
              : 'radial-gradient(circle, #FF2E97 0%, #A855F7 50%, transparent 80%)',
        }}
      />

      {/* Floating Image Asset */}
      <div className="relative z-10 w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] transition-all duration-500 hover:scale-105 flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={480}
          height={480}
          priority
          className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(255,46,151,0.5)]"
        />
      </div>
    </div>
  );
};
