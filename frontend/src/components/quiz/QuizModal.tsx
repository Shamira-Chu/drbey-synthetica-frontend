'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // Index of correct option
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Qual é o papel exclusivo da Jammer durante um jam de 2 minutos?',
    options: [
      'Ancorar a parede de bloqueio no pack.',
      'Marcar pontos ultrapassando quadris das bloqueadoras adversárias.',
      'Sinalizar faltas de corte para a mesa oficial.',
      'Comandar o número de voltas na pista de treino.',
    ],
    answer: 1,
    explanation:
      'A Jammer é a única atleta que marca pontos para a equipe. Cada quadril de bloqueadora adversária ultrapassado legalmente vale 1 ponto.',
  },
  {
    id: 2,
    question: 'O que caracteriza a formação defensiva em Trípode?',
    options: [
      'Três bloqueadoras unidas em ancoragem de braços e quadris.',
      'Três jammers atacando simultaneamente na curva 3.',
      'Uma formação em linha reta ao longo da pista externa.',
      'O uso de três patins especiais de alta velocidade.',
    ],
    answer: 0,
    explanation:
      'O Trípode une três bloqueadoras criando uma estrutura triangular capaz de dissipar o impacto da jammer e fechar corredores de ultrapassagem.',
  },
  {
    id: 3,
    question: 'Como funciona o Passe de Estrela no flat track?',
    options: [
      'A jammer joga o capacete para fora da pista.',
      'A jammer passa o cover com a estrela para a Pivô, transferindo a função.',
      'A pivô troca de patins com a jammer durante o jam.',
      'A arbitragem concede 5 pontos extras por passe limpo.',
    ],
    answer: 1,
    explanation:
      'O Passe de Estrela é uma manobra tática onde a Jammer entrega a capa do capacete para a Pivô, que assume a posição de jammer para pontuar.',
  },
  {
    id: 4,
    question: 'Em 2047, qual é a função do sistema óptico de borda?',
    options: [
      'Substituir completamente todos os árbitros do ginásio.',
      'Detectar saídas ilegais e cortes de pista com precisão milimétrica.',
      'Aumentar a iluminação do domo 360° durante os gols.',
      'Medir o peso dos patins quad no aquecimento.',
    ],
    answer: 1,
    explanation:
      'A arbitragem assistida utiliza sensores ópticos para avisar a mesa sobre cortes de pista em milissegundos, mantendo o julgamento de contato para os juízes humanos.',
  },
];

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (optIdx: number) => {
    if (answered) return;
    setSelectedOpt(optIdx);
    setAnswered(true);

    if (optIdx === currentQ.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOpt(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      if (score >= 3) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F0FF', '#FF2E97', '#A855F7', '#FFB800'],
          });
        } catch {
          // Fallback if confetti fails
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg holo-card border-2 border-pink-500/50 p-6 sm:p-8 bg-[#0D0F26]/95 shadow-[0_0_40px_rgba(255,46,151,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-pink-400 font-semibold">
              ❓ Quiz de Regras · Derby 2047
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-pink-500 transition-colors"
          >
            ×
          </button>
        </div>

        {!showResult ? (
          <div>
            {/* Question Progress */}
            <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-4">
              <span>QUESTÃO {currentIdx + 1} DE {QUIZ_QUESTIONS.length}</span>
              <span className="text-cyan-400">PONTOS: {score}</span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-display font-semibold text-white mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'border-white/15 hover:border-cyan-400 hover:bg-white/5 text-white/80';
                if (answered) {
                  if (idx === currentQ.answer) {
                    btnStyle = 'border-emerald-400 bg-emerald-950/40 text-emerald-300 font-medium';
                  } else if (idx === selectedOpt) {
                    btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                  } else {
                    btnStyle = 'border-white/5 opacity-40 text-white/40';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={answered}
                    className={`w-full p-3.5 text-left text-xs sm:text-sm font-mono rounded-lg border transition-all duration-200 flex items-center gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {answered && (
              <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 mb-6 text-xs font-mono text-cyan-200 leading-relaxed">
                <span className="font-semibold block mb-1 text-cyan-400">💡 Explicação do Regulamento:</span>
                {currentQ.explanation}
              </div>
            )}

            {/* Footer Action */}
            <div className="flex justify-end pt-2">
              {answered ? (
                <button type="button" onClick={handleNext} className="holo-btn holo-btn-gold px-6 py-2.5">
                  {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Próxima Questão →' : 'Ver Resultado Final'}
                </button>
              ) : (
                <p className="text-[11px] font-mono text-white/40 self-center">
                  Selecione uma alternativa para responder
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <span className="text-4xl block mb-2">🏆</span>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Quiz Concluído!
            </h3>
            <p className="text-sm font-mono text-cyan-300 mb-6">
              Você acertou <strong className="text-white text-lg">{score}</strong> de {QUIZ_QUESTIONS.length} questões das regras de 2047.
            </p>

            <p className="text-xs text-white/60 font-body mb-8 max-w-sm mx-auto leading-relaxed">
              {score >= 3
                ? 'Excelente conhecimento tático! Você está pronta para vestir a camisa e entrar na bancada do flat track.'
                : 'Bom esforço! Revise os ensaios de Tática e Arbitragem no acervo para dominar os regulamentos da pista.'}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button type="button" onClick={handleRestart} className="holo-btn px-5 py-2.5">
                Tentar Novamente
              </button>
              <button type="button" onClick={onClose} className="holo-btn holo-btn-magenta px-6 py-2.5">
                Fechar Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
