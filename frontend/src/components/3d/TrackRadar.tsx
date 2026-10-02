'use client';

import React, { useState, useEffect } from 'react';

interface PlayerDot {
  id: string;
  label: string;
  role: 'jammer' | 'blocker' | 'pivot';
  color: string;
  x: number; // Percentage along oval
  speed: number;
}

export const TrackRadar: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [jamNumber, setJamNumber] = useState(14);
  const [packSpeed, setPackSpeed] = useState(38.4);
  const [dots, setDots] = useState<PlayerDot[]>([
    { id: 'j1', label: 'Jammer SP', role: 'jammer', color: '#00F0FF', x: 0.15, speed: 0.008 },
    { id: 'b1', label: 'Trípode A', role: 'blocker', color: '#FF2E97', x: 0.42, speed: 0.005 },
    { id: 'b2', label: 'Trípode B', role: 'blocker', color: '#A855F7', x: 0.44, speed: 0.005 },
    { id: 'p1', label: 'Pivô SP', role: 'pivot', color: '#FFB800', x: 0.46, speed: 0.005 },
    { id: 'j2', label: 'Jammer RJ', role: 'jammer', color: '#10B981', x: 0.85, speed: 0.0075 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) =>
        prev.map((d) => ({
          ...d,
          x: (d.x + d.speed) % 1,
        }))
      );
      setPackSpeed((s) => Number((36 + Math.sin(Date.now() / 1200) * 4).toFixed(1)));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Helper to compute oval position
  const getOvalPos = (t: number) => {
    const angle = t * 2 * Math.PI;
    const rx = compact ? 52 : 72;
    const ry = compact ? 26 : 36;
    const cx = compact ? 65 : 90;
    const cy = compact ? 40 : 50;

    return {
      cx: cx + rx * Math.cos(angle),
      cy: cy + ry * Math.sin(angle),
    };
  };

  return (
    <div
      className={`holo-card p-3 sm:p-4 border border-cyan-500/30 bg-[#0B0D21]/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)] ${
        compact ? 'w-48 sm:w-56' : 'w-64 sm:w-72'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10 text-[10px] sm:text-xs font-mono">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="uppercase tracking-widest font-semibold">Radar da Pista</span>
        </div>
        <span className="text-white/40">JAM #{jamNumber}</span>
      </div>

      <div className="relative flex justify-center items-center py-1">
        <svg
          width={compact ? 130 : 180}
          height={compact ? 80 : 100}
          viewBox={compact ? '0 0 130 80' : '0 0 180 100'}
          className="overflow-visible"
        >
          {/* Outer Track Boundary */}
          <ellipse
            cx={compact ? 65 : 90}
            cy={compact ? 40 : 50}
            rx={compact ? 56 : 78}
            ry={compact ? 28 : 38}
            fill="none"
            stroke="#FF2E97"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.6"
          />

          {/* Inner Track Boundary */}
          <ellipse
            cx={compact ? 65 : 90}
            cy={compact ? 40 : 50}
            rx={compact ? 36 : 48}
            ry={compact ? 16 : 22}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* Jammer Lead Line */}
          <line
            x1={compact ? 65 : 90}
            y1={compact ? 12 : 12}
            x2={compact ? 65 : 90}
            y2={compact ? 24 : 28}
            stroke="#FFB800"
            strokeWidth="2"
          />

          {/* Player dots */}
          {dots.map((dot) => {
            const pos = getOvalPos(dot.x);
            return (
              <g key={dot.id}>
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={dot.role === 'jammer' ? 4.5 : 3.5}
                  fill={dot.color}
                  filter="drop-shadow(0 0 4px currentColor)"
                />
                {dot.role === 'jammer' && (
                  <circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r={7}
                    fill="none"
                    stroke={dot.color}
                    strokeWidth="1"
                    className="animate-ping"
                    opacity="0.4"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/60">
        <span>Pack: <strong className="text-white">{packSpeed} km/h</strong></span>
        <span className="text-amber-400">★ Lead Jammer</span>
      </div>
    </div>
  );
};
