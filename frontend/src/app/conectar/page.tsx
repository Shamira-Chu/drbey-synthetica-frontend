'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { teamService } from '@/services/teamService';
import { eventService } from '@/services/eventService';
import { Team, Event } from '@/types';
import { NetworkMap } from '@/components/connect/NetworkMap';
import { SectionHead } from '@/components/common/SectionHead';
import { Chip } from '@/components/common/Chip';

const cities = ['all', 'São Paulo', 'Rio de Janeiro', 'Curitiba', 'Porto Alegre', 'Brasília', 'Belo Horizonte'];

export default function Conectar() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactOpen, setContactOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    async function load() {
      const [allTeams, allEvents] = await Promise.all([
        teamService.getTeams({ city: cityFilter, search: searchQuery }),
        eventService.getEvents(),
      ]);
      setTeams(allTeams);
      setEvents(allEvents);
      setSelectedTeamId((current) =>
        current && allTeams.some((t) => t.id === current) ? current : allTeams[0]?.id ?? null
      );
    }
    load();
  }, [cityFilter, searchQuery]);

  const selected = teams.find((t) => t.id === selectedTeamId) ?? null;

  const openContact = () => {
    setFormSent(false);
    setContactOpen(true);
  };

  return (
    <div className="px-6 sm:px-8 pt-28 pb-24 max-w-6xl mx-auto space-y-12">
      <header className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-3">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] tracking-wider leading-tight">
            <span style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-white">
              Conectar Ligas & Bouts
            </span>
          </h1>
          <p className="text-slate-300/80 text-xs sm:text-sm font-body leading-relaxed max-w-xl">
            O roller derby existe por apoio mútuo e autogestão. Encontre a liga da sua cidade,
            acompanhe os bouts e junte-se à bancada.
          </p>
        </div>

        {/* Showcase Floating Image */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 animate-[pulse_4s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
            <Image
              src="/imagens/patins.webp"
              alt="Patins Derby Synthetica"
              width={220}
              height={220}
              priority
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,46,151,0.4)]"
            />
          </div>
        </div>
      </header>

      <NetworkMap
        teams={teams}
        selectedTeamId={selectedTeamId}
        onSelectTeam={setSelectedTeamId}
      />

      {/* Filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4 border-y border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {cities.map((city) => (
            <Chip key={city} active={cityFilter === city} onClick={() => setCityFilter(city)}>
              {city === 'all' ? 'Todas as Cidades' : city}
            </Chip>
          ))}
        </div>

        <div className="w-full lg:w-64 shrink-0">
          <input
            type="text"
            placeholder="Buscar liga por nome ou cidade"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F26] border border-white/15 focus:border-cyan-400 text-xs font-mono text-white placeholder:text-white/40 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Ligas List & Selected Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-2">
          {teams.map((team) => {
            const isSelected = team.id === selectedTeamId;
            return (
              <button
                key={team.id}
                type="button"
                onClick={() => setSelectedTeamId(team.id)}
                className={`w-full p-4 text-left rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'glossy-card border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-ping' : 'bg-white/20'}`} />
                  <span style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {team.name}
                  </span>
                </div>
                <span className="font-mono text-xs text-purple-400 font-semibold">{team.state}</span>
              </button>
            );
          })}

          {teams.length === 0 && (
            <p className="py-8 font-mono text-xs text-pink-400 text-center">
              Nenhuma liga encontrada para este filtro.
            </p>
          )}
        </div>

        {selected && (
          <div className="lg:col-span-7">
            <div className="glossy-card p-6 sm:p-8 lg:sticky lg:top-24 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-cyan-400 uppercase font-semibold">{selected.alias}</span>
                <span className="font-mono text-xs text-white/50">
                  {selected.city}, {selected.state}
                </span>
              </div>

              <h2 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-xl sm:text-2xl font-bold text-white">
                {selected.name}
              </h2>

              <p className="text-slate-300/80 text-xs sm:text-sm font-body leading-relaxed">
                {selected.description}
              </p>

              <div className="border-t border-white/10 pt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Fundação</span>
                  <span className="text-white">{selected.foundedYear}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Roster Ativo</span>
                  <span className="text-cyan-300">{selected.rosterCount} atletas</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Pista Base</span>
                  <span className="text-white">{selected.homeTrack}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Instagram</span>
                  <span className="text-pink-400">{selected.instagram}</span>
                </div>
              </div>

              <button type="button" onClick={openContact} className="glossy-btn glossy-btn-magenta w-full py-3">
                Falar com a Liga →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Agenda de Eventos */}
      <section className="pt-12">
        <SectionHead
          title="Próximos Encontros"
          deck="Partidas abertas ao público, workshops de arbitragem e clínicas técnicas."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {events.map((evt) => (
            <div key={evt.id} className="glossy-card p-5 border border-white/10 hover:border-cyan-400/40 space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="font-mono text-xs text-amber-400 font-semibold">{evt.date}</span>
                <span className="text-cyan-300">{evt.isOpenToPublic ? 'Entrada Livre' : 'Inscritas'}</span>
              </div>

              <h3 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-base font-bold text-white">
                {evt.title}
              </h3>

              <p className="text-xs font-mono text-white/60">
                {evt.venue} · {evt.city} · {evt.time}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Contato */}
      {contactOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glossy-card p-6 sm:p-8 bg-[#0D0F26] border-2 border-cyan-400/50 w-full max-w-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs text-cyan-300 font-semibold">{selected.city}</span>
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>

            <h3 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-lg font-bold text-white">{selected.name}</h3>

            {formSent ? (
              <div className="space-y-4">
                <p className="font-mono text-xs text-emerald-400 font-semibold">
                  ✓ Mensagem encaminhada com sucesso!
                </p>
                <p className="text-xs text-slate-300/80 font-body">
                  A equipe de acolhimento Fresh Meat entrará em contato pelo canal informado.
                </p>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="glossy-btn w-full py-2.5"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSent(true);
                }}
                className="space-y-4 font-mono text-xs"
              >
                <div>
                  <label className="block text-white/60 mb-1">Nome Completo</label>
                  <input required type="text" className="w-full p-2.5 rounded bg-black/50 border border-white/15 text-white" />
                </div>

                <div>
                  <label className="block text-white/60 mb-1">E-mail ou WhatsApp</label>
                  <input required type="text" className="w-full p-2.5 rounded bg-black/50 border border-white/15 text-white" />
                </div>

                <div>
                  <label className="block text-white/60 mb-1">Interesse</label>
                  <select className="w-full p-2.5 rounded bg-black/50 border border-white/15 text-white">
                    <option value="fresh_meat">Fresh Meat — começar do zero</option>
                    <option value="transfer">Já patino — transferência</option>
                    <option value="referee">Arbitragem / NSO</option>
                    <option value="fan">Torcida / Bouts</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setContactOpen(false)} className="text-white/50 hover:text-white px-3">
                    Cancelar
                  </button>
                  <button type="submit" className="glossy-btn glossy-btn-magenta px-6 py-2.5">
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
