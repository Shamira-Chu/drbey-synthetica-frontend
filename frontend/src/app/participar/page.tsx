'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { locationService } from '@/services/locationService';
import { LocationVenue } from '@/types';
import { SectionHead } from '@/components/common/SectionHead';
import { Chip } from '@/components/common/Chip';

const journey = [
  { num: '01', title: 'Conheça o esporte', desc: 'Assista a um bout. Observe como as bloqueadoras constroem o pack e como as jammers buscam o ápice da curva.' },
  { num: '02', title: 'Encontre uma liga', desc: 'Quase toda capital tem uma liga autogerida com turmas abertas de Fresh Meat. Não é preciso ter patins no primeiro dia.' },
  { num: '03', title: 'Faça uma aula', desc: 'O primeiro treino é postura, equilíbrio com joelhos flexionados e técnica de queda segura.' },
  { num: '04', title: 'Monte o kit', desc: 'Cinco itens obrigatórios, mais dureza de rodas e amortecedores calibrados para o seu peso.' },
  { num: '05', title: 'Entre na pista', desc: 'Passe no Minimal Skills — paradas de emergência, 27 voltas em 5 minutos e contato legal — e receba seu número.' },
];

const gear = [
  { id: 'skates', title: 'Patins quad', desc: 'Cano baixo, base plana, quatro rodas paralelas.' },
  { id: 'helmet', title: 'Capacete multimpacto', desc: 'Rente à linha da testa, certificado CPSC / ASTM.' },
  { id: 'kneepads', title: 'Joelheiras de alto impacto', desc: 'Espuma espessa e concha rígida para deslizar no solo.' },
  { id: 'wristguards', title: 'Munhequeiras com tala', desc: 'Evitam hiperextensão do pulso nas paradas.' },
  { id: 'elbowpads', title: 'Cotoveleiras com concha', desc: 'Proteção contra colisões laterais.' },
  { id: 'mouthguard', title: 'Protetor bucal', desc: 'Obrigatório em qualquer treino com contato.' },
];

const cities = ['all', 'São Paulo', 'Rio de Janeiro', 'Curitiba', 'Porto Alegre', 'Brasília'];

export default function Participar() {
  const [locations, setLocations] = useState<LocationVenue[]>([]);
  const [cityFilter, setCityFilter] = useState('all');
  const [checked, setChecked] = useState<Record<string, boolean>>({
    skates: true,
    helmet: true,
    kneepads: true,
  });

  useEffect(() => {
    async function load() {
      const data = await locationService.getLocations(cityFilter !== 'all' ? cityFilter : undefined);
      setLocations(data);
    }
    load();
  }, [cityFilter]);

  return (
    <div className="px-6 sm:px-8 pt-28 pb-24 max-w-6xl mx-auto space-y-16">
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-3">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] tracking-wider leading-tight">
            <span style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-white">
              Participar do Esporte
            </span>
          </h1>
          <p className="text-slate-300/80 text-xs sm:text-sm font-body leading-relaxed max-w-xl">
            Você não precisa saber patinar para começar. As ligas brasileiras ensinam desde o
            primeiro equilíbrio até o contato de jogo.
          </p>
        </div>

        {/* Showcase Floating Image */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 animate-[pulse_4s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
            <Image
              src="/imagens/apito.webp"
              alt="Apito Derby Synthetica"
              width={220}
              height={220}
              priority
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,184,0,0.4)]"
            />
          </div>
        </div>
      </header>

      {/* 01: Jornada */}
      <section>
        <SectionHead title="Do zero à primeira jam" />

        <div className="space-y-3 mt-6">
          {journey.map((step) => (
            <div key={step.num} className="glossy-card p-5 border border-white/10 hover:border-cyan-400/40 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 sm:w-56 shrink-0">
                <span className="w-7 h-7 rounded-md bg-cyan-950 border border-cyan-500/40 flex items-center justify-center font-mono text-xs text-cyan-300 font-bold">
                  {step.num}
                </span>
                <span style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-xs font-semibold uppercase tracking-wider text-white">
                  {step.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300/80 font-body leading-relaxed flex-1">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 02: Kit de proteção */}
      <section>
        <SectionHead
          title="Kit de Proteção Obrigatório"
          deck="Ninguém entra na pista sem o conjunto completo. Muitas ligas emprestam proteções nas primeiras semanas."
          action={
            <Link
              href="/descobrir"
              className="font-mono text-xs uppercase tracking-widest text-cyan-400 hover:text-cyan-300"
            >
              Ver ensaios no acervo →
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
          {gear.map((item) => {
            const isChecked = checked[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                aria-pressed={isChecked}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                  isChecked
                    ? 'bg-cyan-950/40 border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    : 'glossy-card border-white/10 opacity-70'
                }`}
              >
                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-xs font-bold shrink-0 ${isChecked ? 'bg-cyan-400 text-black' : 'border border-white/20 text-white/30'}`}>
                  {isChecked ? '✓' : ''}
                </span>
                <div>
                  <span style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className={`text-xs font-semibold uppercase block ${isChecked ? 'text-cyan-300' : 'text-white/60'}`}>
                    {item.title}
                  </span>
                  <span className="text-xs font-body text-slate-300/70 mt-0.5 block">
                    {item.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 03: Locais */}
      <section>
        <SectionHead
          title="Onde Praticar"
          deck="Pistas de piso liso, ginásios com flat track demarcado e quadras com treinos abertos."
          action={
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {cities.map((c) => (
                <Chip key={c} active={cityFilter === c} onClick={() => setCityFilter(c)}>
                  {c === 'all' ? 'Todas' : c}
                </Chip>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {locations.map((loc) => (
            <div key={loc.id} className="glossy-card p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-cyan-300 font-semibold">
                  {loc.city}, {loc.state}
                </span>
                {loc.hasSkateLoan && (
                  <span className="font-mono text-xs text-amber-400 font-semibold">
                    Empresta Patins
                  </span>
                )}
              </div>

              <h3 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-base font-bold text-white">{loc.name}</h3>

              <div className="border-t border-white/10 pt-3 space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Endereço</span>
                  <span className="text-white/90 text-right">{loc.address}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Superfície</span>
                  <span className="text-cyan-300">{loc.surfaceType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Sessões</span>
                  <span className="text-white/90 text-right">{loc.openSessions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-8">
        <div className="glossy-card p-8 sm:p-12 text-center space-y-4 max-w-2xl mx-auto">
          <h2 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-2xl sm:text-3xl font-bold text-white">
            Pronta para a primeira volta?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300/80 font-body max-w-md mx-auto">
            As ligas brasileiras estão com inscrições abertas para turmas de Fresh Meat.
          </p>
          <Link href="/conectar" className="glossy-btn glossy-btn-magenta px-8 py-3 text-xs inline-block">
            Conectar com uma Liga Agora →
          </Link>
        </div>
      </section>
    </div>
  );
}
