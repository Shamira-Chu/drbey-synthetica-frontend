'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { contentService } from '@/services/contentService';
import { Content, Category, Trilha } from '@/types';
import { Chip } from '@/components/common/Chip';
import { EstadoDeErro } from '@/components/common/EstadoDeErro';
import { SeletorTrilha, PainelTrilha, lerTrilha } from '@/components/common/SeletorTrilha';
import { TransicaoDeFiltro } from '@/components/common/TransicaoDeFiltro';

const Cabecalho: React.FC = () => (
  <header className="mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
    <div className="lg:col-span-8 space-y-3">
      <h1 className="text-[clamp(2rem,6vw,3.5rem)] tracking-wider leading-tight">
        <span style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-white">
          Descobrir o Acervo
        </span>
      </h1>
      <p className="text-slate-300/80 text-xs sm:text-sm font-body leading-relaxed max-w-xl">
        O flat track em 2047, lido em duas trilhas: Velocidade para tática, equipamento e
        arbitragem assistida, Expressão para transmissão, som e cultura escrita da pista.
      </p>
    </div>

    {/* Showcase Floating Image */}
    <div className="lg:col-span-4 flex justify-center lg:justify-end">
      <div className="relative w-40 h-40 sm:w-52 sm:h-52 animate-[pulse_4s_ease-in-out_infinite]">
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
        <Image
          src="/imagens/capacete.webp"
          alt="Capacete Derby Synthetica"
          width={220}
          height={220}
          priority
          className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]"
        />
      </div>
    </div>
  </header>
);

const Acervo: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('cat') || 'all';
  const activeTrilha = lerTrilha(searchParams.get('trilha'));

  const [categories, setCategories] = useState<Category[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [featured, setFeatured] = useState<Content | null>(null);
  const [trilhaExibida, setTrilhaExibida] = useState(activeTrilha);
  const [categoriaExibida, setCategoriaExibida] = useState(activeCategory);
  const [buscaExibida, setBuscaExibida] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [buscaAplicada, setBuscaAplicada] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  const isUnfiltered = activeCategory === 'all' && !buscaAplicada;

  useEffect(() => {
    const espera = setTimeout(() => setBuscaAplicada(searchQuery), 280);
    return () => clearTimeout(espera);
  }, [searchQuery]);

  const limparBusca = () => {
    setSearchQuery('');
    setBuscaAplicada('');
  };

  useEffect(() => {
    let cancelado = false;

    async function carregarAcervo() {
      setLoading(true);
      setErro(null);

      try {
        const [cats, encontrados] = await Promise.all([
          contentService.getCategories(),
          contentService.getContents({
            trilha: activeTrilha,
            category: activeCategory !== 'all' ? activeCategory : undefined,
            search: buscaAplicada,
          }),
        ]);

        if (cancelado) return;

        setCategories(cats);
        setContents(encontrados);
        setFeatured(
          isUnfiltered
            ? encontrados.find((conteudo) => conteudo.featured) ?? encontrados[0] ?? null
            : null
        );
      } catch (falha) {
        if (cancelado) return;
        setErro(falha instanceof Error ? falha.message : 'O acervo não respondeu.');
        setContents([]);
        setFeatured(null);
      } finally {
        if (!cancelado) {
          setLoading(false);
          setTrilhaExibida(activeTrilha);
          setCategoriaExibida(activeCategory);
          setBuscaExibida(buscaAplicada);
        }
      }
    }

    carregarAcervo();
    return () => {
      cancelado = true;
    };
  }, [activeTrilha, activeCategory, buscaAplicada, isUnfiltered, tentativa]);

  const selectCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', slug);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const selectTrilha = (trilha: Trilha) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('trilha', trilha);
    params.delete('cat');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const categoriasDaTrilha = categories.filter((cat) => cat.trilha === trilhaExibida);

  const posicaoNaFileira = (slug: string) =>
    slug === 'all' ? 0 : 1 + categoriasDaTrilha.findIndex((cat) => cat.slug === slug);

  const listed = isUnfiltered ? contents.filter((c) => c.slug !== featured?.slug) : contents;

  return (
    <div className="px-6 sm:px-8 pt-28 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <Cabecalho />

        <SeletorTrilha trilha={activeTrilha} onTrilhaChange={selectTrilha} />

        <PainelTrilha trilha={trilhaExibida}>
          <div className="pt-4 space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Buscar ensaio, manobra, regra..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0D0F26] border border-white/15 focus:border-cyan-400 text-xs font-mono text-white placeholder:text-white/40 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={limparBusca}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-white/50 hover:text-cyan-400"
                    aria-label="Limpar busca"
                  >
                    ×
                  </button>
                )}
              </div>

              <span className="font-mono text-xs text-white/50">
                {loading ? 'Consultando acervo...' : `${String(contents.length).padStart(2, '0')} resultados encontrados`}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Chip active={activeCategory === 'all'} onClick={() => selectCategory('all')}>
                Todos
              </Chip>
              {categoriasDaTrilha.map((cat) => (
                <Chip
                  key={cat.id}
                  active={activeCategory === cat.slug}
                  onClick={() => selectCategory(cat.slug)}
                >
                  {cat.name}
                </Chip>
              ))}
            </div>
          </div>

          <TransicaoDeFiltro
            trilha={trilhaExibida}
            filtro={`${categoriaExibida}|${buscaExibida}`}
            posicao={posicaoNaFileira(categoriaExibida)}
          >
            {loading && contents.length === 0 ? (
              <div className="py-20 text-center font-mono text-xs text-cyan-400 animate-pulse">
                Carregando ensaios do acervo...
              </div>
            ) : erro ? (
              <EstadoDeErro
                className="py-16"
                mensagem={erro}
                onTentarDeNovo={() => setTentativa((numero) => numero + 1)}
              />
            ) : contents.length === 0 ? (
              <div className="glossy-card p-8 text-center space-y-4 max-w-md mx-auto my-12">
                <span className="text-2xl block">🔍</span>
                <p className="font-mono text-xs uppercase tracking-widest text-pink-400">
                  Nenhum ensaio encontrado
                </p>
                <p className="text-xs text-white/60 font-body">
                  Redefina o termo de busca ou escolha outra categoria no topo.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    limparBusca();
                    selectCategory('all');
                  }}
                  className="glossy-btn px-5 py-2 text-xs"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {isUnfiltered && featured && (
                  <Link
                    href={`/conteudo/${featured.slug}`}
                    className="glossy-card block p-6 sm:p-10 group"
                  >
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">{featured.categoryName}</span>
                      <span className="font-mono text-xs text-white/40">
                        {featured.readTime} · {featured.date}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {featured.title}
                    </h2>

                    <p className="text-slate-300/80 text-xs sm:text-sm font-body leading-relaxed mb-6 max-w-2xl">
                      {featured.subtitle}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-white/50">{featured.author}</span>
                      <span className="text-pink-400 font-semibold group-hover:translate-x-1 transition-transform">
                        Ler ensaio →
                      </span>
                    </div>
                  </Link>
                )}

                <div className="grid grid-cols-1 gap-3">
                  {listed.map((item, idx) => (
                    <Link
                      key={item.id}
                      href={`/conteudo/${item.slug}`}
                      className="glossy-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group border border-white/10 hover:border-cyan-400/40"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <span className="w-6 h-6 rounded bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center font-mono text-[10px] text-cyan-300 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-300/70 font-body line-clamp-1 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-white/40 shrink-0">
                        <span className="text-purple-400 font-semibold">{item.categoryName}</span>
                        <span>{item.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </TransicaoDeFiltro>
        </PainelTrilha>
      </div>
    </div>
  );
};

export default function DescobrirPage() {
  return (
    <Suspense
      fallback={
        <div className="px-6 sm:px-8 pt-28 pb-24 max-w-6xl mx-auto">
          <Cabecalho />
          <p className="py-20 font-mono text-xs text-cyan-400 animate-pulse text-center">
            Consultando acervo do portal...
          </p>
        </div>
      }
    >
      <Acervo />
    </Suspense>
  );
}
