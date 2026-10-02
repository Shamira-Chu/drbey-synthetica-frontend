'use client';

import React, { useEffect, useState } from 'react';
import { contentService, ContentInput } from '@/services/contentService';
import { ErroDaApi } from '@/services/api';
import { Category, Content } from '@/types';
import { EstadoDeErro } from '@/components/common/EstadoDeErro';
import { FiltroTrilha, FiltroDeTrilha } from '@/components/editorial/FiltroTrilha';
import { ListaConteudos } from '@/components/editorial/ListaConteudos';
import { FormConteudo, ErroDeEnvio } from '@/components/editorial/FormConteudo';
import { ModalConfirmacao } from '@/components/editorial/ModalConfirmacao';

type Operacao = 'criando' | 'salvando' | 'excluindo' | null;

const ROTULO_DA_OPERACAO: Record<Exclude<Operacao, null>, string> = {
  criando: 'Criando ensaio',
  salvando: 'Salvando alterações',
  excluindo: 'Excluindo ensaio',
};

interface Aviso {
  texto: string;
  tom: 'ok' | 'falha';
}

export default function EditorialPage() {
  const [filtro, setFiltro] = useState<FiltroDeTrilha>('todas');

  const [categorias, setCategorias] = useState<Category[]>([]);
  const [conteudos, setConteudos] = useState<Content[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroDeCarga, setErroDeCarga] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  const [modo, setModo] = useState<'indice' | 'formulario'>('indice');
  const [emEdicao, setEmEdicao] = useState<Content | null>(null);
  const [operacao, setOperacao] = useState<Operacao>(null);
  const [erroDeEnvio, setErroDeEnvio] = useState<ErroDeEnvio | null>(null);
  const [aExcluir, setAExcluir] = useState<Content | null>(null);
  const [aviso, setAviso] = useState<Aviso | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      setCarregando(true);
      setErroDeCarga(null);

      try {
        const [cats, encontrados] = await Promise.all([
          contentService.getCategories(),
          contentService.getContents({ trilha: filtro === 'todas' ? undefined : filtro }),
        ]);

        if (cancelado) return;
        setCategorias(cats);
        setConteudos(encontrados);
      } catch (falha) {
        if (cancelado) return;
        setErroDeCarga(falha instanceof Error ? falha.message : 'O acervo não respondeu.');
        setConteudos([]);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [filtro, tentativa]);

  useEffect(() => {
    if (aviso?.tom !== 'ok') return;
    const espera = setTimeout(() => setAviso(null), 6000);
    return () => clearTimeout(espera);
  }, [aviso]);

  const recarregar = () => setTentativa((numero) => numero + 1);

  const descreverFalha = (falha: unknown): ErroDeEnvio => ({
    mensagem: falha instanceof Error ? falha.message : 'A API não respondeu.',
    status: falha instanceof ErroDaApi ? falha.status : 0,
  });

  const abrirCadastro = () => {
    setEmEdicao(null);
    setErroDeEnvio(null);
    setAviso(null);
    setModo('formulario');
  };

  const abrirEdicao = (conteudo: Content) => {
    setEmEdicao(conteudo);
    setErroDeEnvio(null);
    setAviso(null);
    setModo('formulario');
  };

  const fecharFormulario = () => {
    setModo('indice');
    setEmEdicao(null);
    setErroDeEnvio(null);
  };

  const salvar = async (entrada: ContentInput) => {
    setErroDeEnvio(null);
    setOperacao(emEdicao ? 'salvando' : 'criando');

    try {
      if (emEdicao) {
        await contentService.updateContent(emEdicao.id, entrada);
      } else {
        await contentService.createContent(entrada);
      }

      setAviso({
        texto: emEdicao
          ? `Alterações salvas em "${entrada.title}".`
          : `"${entrada.title}" entrou no acervo.`,
        tom: 'ok',
      });

      fecharFormulario();
      recarregar();
    } catch (falha) {
      setErroDeEnvio(descreverFalha(falha));
    } finally {
      setOperacao(null);
    }
  };

  const confirmarExclusao = async () => {
    if (!aExcluir) return;
    setOperacao('excluindo');

    try {
      await contentService.deleteContent(aExcluir.id);
      setAviso({ texto: `"${aExcluir.title}" saiu do acervo.`, tom: 'ok' });
      setAExcluir(null);
      recarregar();
    } catch (falha) {
      setAviso({ texto: descreverFalha(falha).mensagem, tom: 'falha' });
      setAExcluir(null);
    } finally {
      setOperacao(null);
    }
  };

  return (
    <div className="px-6 sm:px-8 pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 style={{ fontFamily: "'Audiowide', cursive, sans-serif" }} className="text-[clamp(2rem,7vw,3.5rem)] text-white font-bold">
            Painel Editorial
          </h1>

          <p className="mt-4 text-slate-300/80 text-[13px] sm:text-sm font-body leading-relaxed max-w-xl">
            A mesa onde o acervo é escrito. Cadastro, edição e remoção de ensaio falam direto
            com a API do portal, e o que for gravado aqui aparece em Descobrir na mesma hora.
          </p>
        </header>

        <div aria-live="polite" className="min-h-[1.5rem] mb-6">
          {operacao ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pink-400 animate-pulse">
              {ROTULO_DA_OPERACAO[operacao]}
            </p>
          ) : aviso ? (
            <p
              className={`font-mono text-[11px] tracking-[0.14em] ${
                aviso.tom === 'ok' ? 'text-cyan-300' : 'text-pink-400'
              }`}
            >
              {aviso.tom === 'ok' ? '> ' : '! '}
              {aviso.texto}
            </p>
          ) : null}
        </div>

        {modo === 'formulario' ? (
          <FormConteudo
            key={emEdicao?.id ?? 'novo'}
            categorias={categorias}
            conteudo={emEdicao}
            salvando={operacao === 'criando' || operacao === 'salvando'}
            erro={erroDeEnvio}
            onLimparErro={() => setErroDeEnvio(null)}
            onSalvar={salvar}
            onCancelar={fecharFormulario}
          />
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
              <FiltroTrilha
                valor={filtro}
                onChange={setFiltro}
                total={carregando ? null : conteudos.length}
              />

              <button type="button" onClick={abrirCadastro} className="glossy-btn glossy-btn-magenta px-6 py-3">
                Novo ensaio
              </button>
            </div>

            {carregando && conteudos.length === 0 ? (
              <p className="py-20 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-400 animate-pulse">
                Consultando acervo...
              </p>
            ) : erroDeCarga ? (
              <EstadoDeErro className="py-16" mensagem={erroDeCarga} onTentarDeNovo={recarregar} />
            ) : (
              <ListaConteudos
                conteudos={conteudos}
                onEditar={abrirEdicao}
                onExcluir={setAExcluir}
                filtrado={filtro !== 'todas'}
                onLimparFiltro={() => setFiltro('todas')}
                idOcupado={operacao === 'excluindo' ? aExcluir?.id ?? null : null}
              />
            )}
          </>
        )}
      </div>

      <ModalConfirmacao
        aberto={Boolean(aExcluir)}
        titulo="Excluir do acervo"
        processando={operacao === 'excluindo'}
        rotuloProcessando="Excluindo"
        rotuloConfirmar="Excluir ensaio"
        onConfirmar={confirmarExclusao}
        onCancelar={() => setAExcluir(null)}
        mensagem={
          <>
            <p>
              <span className="text-white font-semibold">{aExcluir?.title}</span> sai do acervo e a página{' '}
              <span className="font-mono text-[12px] text-pink-400">/conteudo/{aExcluir?.slug}</span>{' '}
              passa a responder que o ensaio não existe.
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Não há como desfazer pelo painel. Um ensaio escrito aqui não está no seed, e por
              isso não volta quando o servidor reinicia.
            </p>
          </>
        }
      />
    </div>
  );
}
