'use client';

import React, { useState } from 'react';
import { QuizModal } from '@/components/quiz/QuizModal';

interface GameFeatureBarProps {
  onOpenArena3D?: () => void;
  onOpenInspection?: () => void;
}

export const GameFeatureBar: React.FC<GameFeatureBarProps> = ({
  onOpenArena3D,
  onOpenInspection,
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <>
      {/* Sticky Bottom Feature Bar directly styled like the Game Screenshot */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-2 sm:p-3 pointer-events-none">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 overflow-x-auto p-2 rounded-xl bg-[#0B0D21]/90 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto">
          {/* Left Button: Comandos */}
          <button
            type="button"
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="holo-btn text-[10px] sm:text-xs py-1.5 px-3 shrink-0"
          >
            ⌨ Comandos
          </button>

          {/* Center Buttons matching Game UI */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={onOpenArena3D}
              className="holo-btn holo-btn-gold text-[10px] sm:text-xs py-1.5 px-3.5 whitespace-nowrap shrink-0"
            >
              👑 Kings League 3D (Arena)
            </button>

            <button
              type="button"
              onClick={onOpenInspection}
              className="holo-btn text-[10px] sm:text-xs py-1.5 px-3.5 whitespace-nowrap shrink-0 border-cyan-400/50 text-cyan-300"
            >
              📚 Pontos Interativos (5)
            </button>

            <button
              type="button"
              onClick={() => setShowQuiz(true)}
              className="holo-btn holo-btn-magenta text-[10px] sm:text-xs py-1.5 px-3.5 whitespace-nowrap shrink-0"
            >
              ❓ Quiz de Regras
            </button>
          </div>
        </div>
      </div>

      {/* Shortcuts Drawer / Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md holo-card p-6 bg-[#0D0F26] border border-cyan-400/40">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                ⌨ Atilhos & Comandos da Arena
              </span>
              <button
                type="button"
                onClick={() => setShowShortcuts(false)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs text-white/80">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span>Rotacionar Arena 3D</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-cyan-300">Arrastar Mouse / Botoes</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span>Inspecionar Ponto Tático</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-pink-300">Tecla [E] ou Clique</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span>Alternar Câmeras (Drone / Domo)</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-amber-300">Menu da Arena</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span>Radar da Pista ao Vivo</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-emerald-300">Canto Superior Direito</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowShortcuts(false)}
                className="holo-btn px-5 py-2 text-xs"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
    </>
  );
};
