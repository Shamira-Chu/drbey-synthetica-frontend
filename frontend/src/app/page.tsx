'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { contentService } from '@/services/contentService';
import { Content } from '@/types';
import { FluidGlassSculpture } from '@/components/common/FluidGlassSculpture';
import { SyntheticaButton } from '@/components/ui/SyntheticaButton';

const acervoCards = [
  {
    num: '01',
    title: 'Tática & Formações',
    desc: 'Estratégias de trípode defensivo, passe de estrela da jammer para a pivô e reciclagem de bloqueadoras no pack.',
    link: '/descobrir?categoria=tatica',
  },
  {
    num: '02',
    title: 'Equipamento & Patins',
    desc: 'Guia completo de dureza de rodas de poliuretano, regulagem de trucks, joelheiras de alto impacto e protetor bucal.',
    link: '/descobrir?categoria=equipamentos',
  },
  {
    num: '03',
    title: 'Regras & Arbitragem',
    desc: 'Manual atualizado do WFTDA, zonas legais de impacto, faltas de corte de pista e sinalização de arbitragem.',
    link: '/descobrir?categoria=regras',
  },
  {
    num: '04',
    title: 'Cultura & Comunidade',
    desc: 'História das ligas autogestionadas, representatividade de gênero, escolha de derby names e inclusão.',
    link: '/descobrir?categoria=comunidade',
  },
];

const processRows = [
  {
    title: 'ENTENDA',
    desc: 'Estude as regras básicas do flat track e assista aos primeiros bouts gravados do nosso acervo.',
  },
  {
    title: 'EXPERIMENTE',
    desc: 'Participe de uma aula aberta do programa Fresh Meat e aprenda a cair com segurança em quatro apoios.',
  },
  {
    title: 'ENCONTRE UMA LIGA',
    desc: 'Localize a liga autogestionada mais próxima do seu município e agende um treino de boas-vindas.',
  },
  {
    title: 'ENTRE NA PISTA',
    desc: 'Passe no teste de habilidades mínimas (Minimum Skills), registre seu derby name e jogue seu primeiro jam.',
  },
];

export default function Home() {
  const [featured, setFeatured] = useState<Content | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    mensagem: '',
  });

  // Parallax Scroll Listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let cancelado = false;
    async function carregarAcervo() {
      try {
        const destaque = await contentService.getFeaturedContent();
        if (!cancelado) setFeatured(destaque);
      } catch (e) {
        // Fallback
      }
    }
    carregarAcervo();
    return () => {
      cancelado = true;
    };
  }, []);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Parallax Offsets
  const textParallax = scrollY * 0.12;
  const sculptureParallax = scrollY * -0.06;
  const heroOpacity = Math.max(0, 1 - scrollY / 750);

  return (
    <div className="space-y-40 pt-28 pb-24 px-6 sm:px-12 w-[88vw] max-w-[1650px] mx-auto text-white">
      {/* ===================================================
          1. HERO SECTION (Capacete)
          =================================================== */}
      <section className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 pt-4">
        {/* Coluna Esquerda: Texto */}
        <div
          className="lg:col-span-7 space-y-8 transition-transform ease-out duration-75 pr-2"
          style={{
            transform: `translate3d(0, ${textParallax}px, 0)`,
            opacity: heroOpacity,
          }}
        >
          <h1 className="text-[clamp(2.5rem,5.8vw,5.5rem)] font-display font-extrabold tracking-tight uppercase leading-[0.95] text-white whitespace-nowrap">
            <span className="block text-white">DERBY</span>
            <span className="block text-white">SYNTHETICA</span>
          </h1>

          <p className="text-slate-300 font-body text-base sm:text-xl leading-relaxed max-w-xl">
            Vinte anos atrás era esporte de galpão alugado e ingresso vendido na porta. Hoje enche ginásios. A próxima evolução do flat track roller derby com arbitragem assistida por laser e autogestão de atletas.
          </p>

          <div className="pt-2">
            <SyntheticaButton href="/descobrir" badgeBg="bg-cyan-400" badgeTextColor="text-black">
              EXPLORAR A PLATAFORMA
            </SyntheticaButton>
          </div>

          <div className="pt-8 flex items-center gap-3 text-cyan-400">
            <span className="w-8 h-8 rounded-full border border-cyan-400/40 flex items-center justify-center text-xs animate-bounce">
              ↓
            </span>
            <span className="font-mono tracking-widest uppercase text-[11px]">ROLE PARA EXPLORAR</span>
          </div>
        </div>

        {/* Coluna Direita: Capacete em Destaque */}
        <div
          className="lg:col-span-5 relative flex items-center justify-center transition-transform ease-out duration-75"
          style={{
            transform: `translate3d(0, ${sculptureParallax}px, 0)`,
          }}
        >
          <div className="relative z-10 w-full">
            <FluidGlassSculpture variant="capacete" alt="Capacete Derby Synthetica" />
          </div>
        </div>
      </section>

      {/* ===================================================
          2. QUEM SOMOS (Patins)
          =================================================== */}
      <section className="relative min-h-[75vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div className="absolute top-0 right-0 font-display text-[clamp(6rem,22vw,16rem)] font-extrabold uppercase text-white/[0.03] select-none pointer-events-none leading-none z-0">
          DERBY
        </div>

        <div className="lg:col-span-5 relative z-10 flex items-center justify-center">
          <div className="relative z-10 w-full">
            <FluidGlassSculpture variant="patins" alt="Patins Derby Synthetica" />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase leading-tight">
            Combate tático sem bola na tração de oito rodas.
          </h2>

          <p className="text-slate-300 font-body text-base leading-relaxed">
            O Derby Synthetica é a plataforma oficial que conecta atletas, ligas independentes, equipe de arbitragem e torcedores de flat track roller derby em todo o território nacional.
          </p>

          <p className="text-slate-400 font-body text-sm leading-relaxed">
            Mantemos viva a essência da autogestão: quadras públicas, formação de atletas via Fresh Meat, arbitragem voluntária e a assembleia de atletas que decide cada regra do campeonato.
          </p>

          <div className="pt-2">
            <SyntheticaButton href="/descobrir" badgeBg="bg-pink-500" badgeTextColor="text-white">
              CONHECER O ACERVO
            </SyntheticaButton>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. O ACERVO
          =================================================== */}
      <section className="relative space-y-12 pt-8">
        <div className="absolute top-0 left-0 font-display text-[clamp(6rem,22vw,16rem)] font-extrabold uppercase text-white/[0.03] select-none pointer-events-none leading-none z-0">
          ACERVO
        </div>

        <div className="relative z-10 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase">
            Conhecimento Prático para a Pista
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {acervoCards.map((card) => (
            <div
              key={card.num}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-8 hover:border-purple-400/50 hover:bg-white/[0.06] transition-all group"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-purple-400 font-bold block">
                  {card.num}
                </span>
                <h3 className="text-xl font-display font-bold text-white uppercase group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300 font-body leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <Link
                href={card.link}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 font-mono text-xs text-white/90 group-hover:text-purple-300 transition-colors"
              >
                <span>EXPLORAR</span>
                <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-purple-500 group-hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center pt-8 relative z-10">
          <SyntheticaButton href="/descobrir" badgeBg="bg-purple-500" badgeTextColor="text-white">
            VER TODOS OS ENSAIOS
          </SyntheticaButton>
        </div>
      </section>

      {/* ===================================================
          4. PASSO A PASSO
          =================================================== */}
      <section className="relative space-y-12 pt-8">
        <div className="space-y-3 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase">
            O Caminho para Entrar na Pista
          </h2>
        </div>

        <div className="space-y-6 relative z-10">
          {processRows.map((proc) => (
            <div
              key={proc.title}
              className="py-6 px-4 sm:px-8 rounded-2xl hover:bg-white/[0.02] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
                {proc.title}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:max-w-xl">
                <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed flex-1">
                  {proc.desc}
                </p>
                <Link
                  href="/participar"
                  className="w-10 h-10 rounded-full border border-white/25 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black flex items-center justify-center transition-all text-sm shrink-0"
                >
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 relative z-10">
          <SyntheticaButton href="/participar" badgeBg="bg-cyan-400" badgeTextColor="text-black">
            AGENDAR AULA EXPERIMENTAL
          </SyntheticaButton>
        </div>
      </section>

      {/* ===================================================
          5. FORMULÁRIO DE CONTATO (Apito)
          =================================================== */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div className="lg:col-span-5 relative flex items-center justify-center z-10">
          <div className="relative z-10 w-full">
            <FluidGlassSculpture variant="apito" alt="Apito Derby Synthetica" />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase">
            Agende sua Aula Experimental
          </h2>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-cyan-950/40 border border-cyan-400/50 space-y-3">
              <h3 className="text-lg font-display font-bold text-cyan-300">
                MENSAGEM ENVIADA COM SUCESSO
              </h3>
              <p className="text-xs text-slate-300 font-body">
                Nossa equipe de recepção entrará em contato via e-mail para confirmar a data do seu treino de Fresh Meat.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Seu Nome Completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  placeholder="Seu E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Seu Telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Sua Cidade / Liga de Interesse"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="Sua Mensagem ou Dúvida"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <SyntheticaButton type="submit" badgeBg="bg-cyan-400" badgeTextColor="text-black">
                ENVIAR MENSAGEM
              </SyntheticaButton>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
