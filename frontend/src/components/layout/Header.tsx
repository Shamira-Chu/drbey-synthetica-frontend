'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'DESCOBRIR', path: '/descobrir' },
  { label: 'CONECTAR', path: '/conectar' },
  { label: 'PARTICIPAR', path: '/participar' },
  { label: 'EDITORIAL', path: '/editorial' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <header className="fixed top-5 inset-x-0 z-50 px-4 sm:px-8 w-[92vw] max-w-[1650px] mx-auto pointer-events-none">
      <div className="pointer-events-auto px-8 py-3.5 rounded-2xl bg-black/40 backdrop-blur-2xl transition-all duration-300 flex items-center justify-between gap-6">
        {/* Brand Logo in Audiowide Font */}
        <Link
          href="/"
          className="text-base sm:text-lg tracking-[0.18em] font-normal text-white whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          <span className="font-audiowide" style={{ fontFamily: "'Audiowide', cursive, sans-serif" }}>
            DERBY SYNTHETICA
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 font-mono text-[12px] uppercase tracking-[0.2em]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition-colors ${
                isActive(item.path)
                  ? 'text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Magenta Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/participar"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 text-white font-mono text-[11px] uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(217,70,239,0.45)] hover:shadow-[0_0_28px_rgba(217,70,239,0.65)] transition-all whitespace-nowrap"
          >
            ENTRE NA PISTA
          </Link>
        </div>
      </div>
    </header>
  );
};
