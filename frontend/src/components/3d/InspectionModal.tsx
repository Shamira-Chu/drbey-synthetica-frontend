'use client';

import React from 'react';

export interface InspectionData {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  badge: string;
  description: string;
  specifications: { label: string; value: string }[];
  takeaways: string[];
}

interface InspectionModalProps {
  data: InspectionData | null;
  onClose: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl holo-card border-2 border-cyan-400/50 p-6 sm:p-8 bg-[#0D0F26]/95 shadow-[0_0_40px_rgba(0,240,255,0.25)]">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
          <span className="holo-tag holo-tag-cyan">{data.badge}</span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400 transition-colors"
            aria-label="Fechar inspecção"
          >
            ×
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block mb-1">
            // PONTO INTERATIVO 3D DE INSPEÇÃO
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
            {data.title}
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-mono mt-1">{data.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body mb-6">
          {data.description}
        </p>

        {/* Specifications */}
        <div className="mb-6 border-t border-white/10 pt-4 space-y-2">
          {data.specifications.map((spec) => (
            <div key={spec.label} className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/40 uppercase tracking-wider">{spec.label}</span>
              <span className="text-cyan-300 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Takeaways */}
        {data.takeaways.length > 0 && (
          <div className="mb-6 bg-cyan-950/30 border border-cyan-500/20 rounded-lg p-3 sm:p-4">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-semibold">
              ★ Destaques de Pista:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300 font-body">
              {data.takeaways.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="holo-btn holo-btn-magenta px-6 py-2">
            Concluir Inspeção
          </button>
        </div>
      </div>
    </div>
  );
};
