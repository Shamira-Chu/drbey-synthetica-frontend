'use client';

import React from 'react';
import Link from 'next/link';

export const CinematicHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden bg-[#070914] rounded-3xl border border-white/15 my-4 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
      {/* 1. Curved Metallic Arena & Neon Strip Lighting Background Layers */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Overhead Curved LED Banner Glow */}
        <div
          className="absolute -top-20 -left-20 w-[120%] h-[350px] opacity-35 blur-[70px] -rotate-6"
          style={{
            background:
              'linear-gradient(90deg, #FF2E97 0%, #A855F7 40%, #00F0FF 80%, transparent 100%)',
          }}
        />

        {/* Polished Metallic Track Surface Ambient Reflection */}
        <div
          className="absolute bottom-0 inset-x-0 h-[60%] opacity-25 blur-[90px]"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 50% 100%, #00F0FF 0%, #FF2E97 35%, transparent 75%)',
          }}
        />

        {/* Track Line Light Strips */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
            {/* Curved Arena Architecture Lines */}
            <path
              d="M -100,500 Q 300,200 1100,450"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2"
            />
            <path
              d="M -100,530 Q 300,230 1100,480"
              fill="none"
              stroke="#FF2E97"
              strokeWidth="2.5"
            />
            <path
              d="M -100,120 Q 500,40 1100,180"
              fill="none"
              stroke="#A855F7"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
          </svg>
        </div>

        {/* Ticker Marquee Overhead Ribbon */}
        <div className="absolute top-16 -left-10 right-0 -rotate-3 opacity-20 pointer-events-none">
          <div className="animate-ticker font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cyan-300 font-semibold whitespace-nowrap">
            <span className="mx-8">SYNTHETICA ARENA</span>
            <span className="mx-8 text-pink-400">«|||» TRANSMISSÃO AO VIVO</span>
            <span className="mx-8 text-purple-400">FLAT TRACK 2047</span>
            <span className="mx-8">SYNTHETICA ARENA</span>
            <span className="mx-8 text-pink-400">«|||» TRANSMISSÃO AO VIVO</span>
            <span className="mx-8 text-purple-400">FLAT TRACK 2047</span>
          </div>
        </div>
      </div>

      {/* 2. Top Frosted Glass Navigation Bar (Matching Screenshot Header) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto mb-8 sm:mb-12">
        <div className="px-6 py-3.5 rounded-2xl bg-[#101328]/60 backdrop-blur-xl border border-white/15 flex items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <Link
            href="/"
            className="font-display text-xs sm:text-sm tracking-[0.2em] font-bold text-white whitespace-nowrap"
          >
            DERBY SYNTHETICA
          </Link>

          <nav className="hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300/80">
            <Link href="/descobrir" className="hover:text-cyan-300 transition-colors">
              Descobrir
            </Link>
            <Link href="/conectar" className="hover:text-cyan-300 transition-colors">
              Conectar
            </Link>
            <Link href="/participar" className="hover:text-cyan-300 transition-colors">
              Participar
            </Link>
            <Link href="/editorial" className="text-pink-400/90 hover:text-pink-300 transition-colors">
              Editorial
            </Link>
          </nav>

          <Link
            href="/participar"
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-mono text-[10px] uppercase tracking-widest transition-all whitespace-nowrap"
          >
            Entre na Pista
          </Link>
        </div>
      </div>

      {/* 3. Main Hero Content Grid (2 Columns: Headline Left, Telemetry Glass Cards Right) */}
      <div className="relative z-20 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-end my-auto py-6">
        {/* Left Column: Bold Headline & Prose */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-[clamp(2.2rem,6.5vw,4.5rem)] font-display font-extrabold tracking-tight leading-[0.98] uppercase text-white">
              <span className="block">Performance</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Sintética.
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                Velocidade Incomparável.
              </span>
            </h1>
          </div>

          <p className="text-slate-300/80 font-body text-sm sm:text-base leading-relaxed max-w-lg">
            A próxima evolução do flat track roller derby na temporada 2047. Tecnologia de arbitragem assistida por laser, telemetria de atletas ao vivo e autogestão de liga.
          </p>

          <div className="pt-2">
            <Link
              href="/descobrir"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#121632]/80 hover:bg-[#181d42] backdrop-blur-xl border border-white/25 hover:border-cyan-400 text-white font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)] group"
            >
              <span>Explorar a Plataforma</span>
              <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Frosted Glass Telemetry Cards (Matching Reference Screenshot) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Telemetria de Pista */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1126]/60 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-xs uppercase tracking-widest text-slate-300">
              <span className="font-semibold text-white">Telemetria ao Vivo</span>
              <span className="text-cyan-400">Ao Vivo</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Frequência Cardíaca Média</span>
                <span className="text-white font-semibold">168 BPM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Velocidade do Pack</span>
                <span className="text-cyan-300 font-semibold">38.4 km/h</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Aceleração Jammer</span>
                <span className="text-purple-300 font-semibold">4.2 m/s²</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Capacidade VO2 Max</span>
                <span className="text-pink-400 font-semibold">94%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Progresso do Bout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1126]/60 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-xs uppercase tracking-widest text-slate-300">
              <span className="font-semibold text-white">Progresso do Bout</span>
              <span className="text-pink-400">JAM #14</span>
            </div>

            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Lead Jammer</span>
                <span className="text-cyan-300 font-medium">São Paulo Derby Club</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Placar Parcial</span>
                <span className="text-white font-bold text-sm">84 - 72</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
