'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen px-6 py-32 flex items-center justify-center text-center">
      <div className="glossy-card p-8 sm:p-12 max-w-md w-full border border-pink-500/40 space-y-4">
        <span className="text-3xl block">🚨</span>
        <h2 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-xl font-bold text-white">
          404 · Ensaio Fora da Pista
        </h2>
        <p className="text-xs text-slate-300 font-body">
          A página ou ensaio procurado não foi encontrado no acervo da temporada 2047.
        </p>
        <div className="pt-4">
          <Link href="/" className="glossy-btn glossy-btn-magenta text-xs px-6 py-2.5">
            Voltar para o Início →
          </Link>
        </div>
      </div>
    </div>
  );
}
