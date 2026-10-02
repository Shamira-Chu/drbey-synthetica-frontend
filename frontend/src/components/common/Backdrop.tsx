import React from 'react';

/**
 * Fundo base escuro puro (#03040B).
 * Cada seção gerencia seu próprio ponto de luz dinâmico (Ciano, Magenta, Violeta).
 */
export const Backdrop: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#03040B]" />
);
