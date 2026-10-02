export interface SecaoDaApi {
  titulo?: string | null;
  texto: string;
  citacao?: string | null;
  destaque?: string | null;
}

export interface ConteudoDaApi {
  id: number;
  slug: string;
  titulo: string;
  subtitulo: string;
  categoria_id: number;
  resumo: string;
  tempo_leitura: string;
  data: string;
  autor: string;
  autor_cargo: string;
  destaque: boolean;
  selo_editorial?: string | null;
  arquetipo_grafico: string;
  aprendizados: string[];
  secoes: SecaoDaApi[];
  slugs_relacionados: string[];
  categoria_slug: string;
  categoria_nome: string;
  trilha: 'velocidade' | 'expressao';
}

export interface CategoriaDaApi {
  id: number;
  slug: string;
  nome: string;
  descricao_curta: string;
  trilha: 'velocidade' | 'expressao';
}

export const INITIAL_CATEGORIES: CategoriaDaApi[] = [
  {
    id: 1,
    slug: 'tatica-e-pack',
    nome: 'Tática & Pack',
    descricao_curta: 'Formatos de paredes, sincronia e destruição do pack',
    trilha: 'velocidade',
  },
  {
    id: 2,
    slug: 'equipamento',
    nome: 'Equipamento & Tração',
    descricao_curta: 'Patins quad, dureza de rodas e proteções rígidas',
    trilha: 'velocidade',
  },
  {
    id: 3,
    slug: 'arbitragem',
    nome: 'Arbitragem Assistida',
    descricao_curta: 'Sistemas de visão computacional e faltas corporais',
    trilha: 'velocidade',
  },
  {
    id: 4,
    slug: 'transmissao',
    nome: 'Transmissão & Som',
    descricao_curta: 'Câmeras de pista, mixagem de ruído e voz de pista',
    trilha: 'expressao',
  },
  {
    id: 5,
    slug: 'cultura-escrita',
    nome: 'Cultura & Zines',
    descricao_curta: 'Ensaios, manifestos e registro histórico dos bouts',
    trilha: 'expressao',
  },
];

export const INITIAL_CONTENTS: ConteudoDaApi[] = [
  {
    id: 101,
    slug: 'geometria-da-parede-tripode',
    titulo: 'Geometria e Resistência na Parede Trípode de 2047',
    subtitulo: 'Como a formação em trípode evoluiu para resistir às arrancadas de alta tração',
    categoria_id: 1,
    resumo: 'Uma análise física da recomposição do pack e das linhas de contato dinâmico na curva 3.',
    tempo_leitura: '6 min de leitura',
    data: '18 MAR 2047',
    autor: 'Valéria "Vortex" Santos',
    autor_cargo: 'Estrategista da Liga SP Roller Crime',
    destaque: true,
    selo_editorial: 'Destaque Técnico',
    arquetipo_grafico: 'star',
    aprendizados: [
      'A base triangular redistribui até 40% da força do impacto da jammer.',
      'A rotação de pivô precisa ser sincronizada pelo ombro do meio.',
      'O tempo de reação para fechamento do hip-check caiu para menos de 200ms.',
    ],
    secoes: [
      {
        titulo: 'Anatomia do Trípode',
        texto: 'A parede trípode se consolidou como a defesa soberana do flat track. Unindo três bloqueadoras em constante ancoragem de braços e quadris, ela cria uma barreira articulada incapaz de ser penetrada por um único vetor frontal.',
        citacao: 'O segredo da parede não é a força bruta, é a dissipação da energia mecânica.',
        destaque: 'Sincronia muscular e comunicação tátil sob alta velocidade.',
      },
      {
        titulo: 'Dissipação na Curva 3',
        texto: 'Ao entrar na curva 3, a força centrífuga tende a dispersar os corpos para a borda externa da pista. A bloqueadora central atua como fulcro, mantendo o raio curto enquanto as alas fecham o corredor interno.',
      },
    ],
    slugs_relacionados: ['calibragem-de-rodas-para-piso-sintetico', 'visao-computacional-no-flat-track'],
    categoria_slug: 'tatica-e-pack',
    categoria_nome: 'Tática & Pack',
    trilha: 'velocidade',
  },
  {
    id: 102,
    slug: 'calibragem-de-rodas-para-piso-sintetico',
    titulo: 'Calibragem e Durabilidade de Rodas para Pisos Sintéticos',
    subtitulo: 'Escolhendo a dureza em Shore A ideal para cada tipo de polímero de quadra',
    categoria_id: 2,
    resumo: 'Guia prático de combinação de durometria para tração lateral e resposta imediata.',
    tempo_leitura: '5 min de leitura',
    data: '12 MAR 2047',
    autor: 'Kamila "Kevlar" Rocha',
    autor_cargo: 'Chefe de Oficina de Equipamentos',
    destaque: false,
    selo_editorial: null,
    arquetipo_grafico: 'gear',
    aprendizados: [
      'A combinação de 92A na parte interna e 95A na externa maximiza curvas rápidas.',
      'Aderência no piso sintético depende da temperatura das rodas durante o aquecimento.',
    ],
    secoes: [
      {
        titulo: 'A Física do Poliuretano',
        texto: 'Os pisos sintéticos modernos do flat track exigem afinação fina das rodas. Escolher uma roda muito macia causa deformação e perda de energia de saída nas paradas em T.',
        citacao: 'Tração demais trava o patim; tração de menos faz perder a borda.',
      },
    ],
    slugs_relacionados: ['geometria-da-parede-tripode'],
    categoria_slug: 'equipamento',
    categoria_nome: 'Equipamento & Tração',
    trilha: 'velocidade',
  },
  {
    id: 103,
    slug: 'visao-computacional-no-flat-track',
    titulo: 'Arbitragem Assistida por Visão Computacional',
    subtitulo: 'A convivência entre sensores de linha e o julgamento humano dos referees',
    categoria_id: 3,
    resumo: 'Como a tecnologia auxilia na contagem de pontos e marcação de saídas de pista sem tirar o papel dos juízes.',
    tempo_leitura: '8 min de leitura',
    data: '02 MAR 2047',
    autor: 'Beatriz "Byte" Lima',
    autor_cargo: 'Árbitra Head & Desenvolvedora de Sistemas',
    destaque: false,
    selo_editorial: 'Artigo de Fundo',
    arquetipo_grafico: 'sensor',
    aprendizados: [
      'Sensores ópticos na borda confirmam cortes de pista em menos de 50 milissegundos.',
      'O julgamento de intenção e insubordinação permanece 100% sob o controle do corpo de arbitragem.',
    ],
    secoes: [
      {
        titulo: 'A Linha Invisível',
        texto: 'O flat track de 2047 utiliza varredura a laser ao redor do oval para monitorar a linha interna e externa. Quando um patim sai completamente da área legal, o sistema sinaliza a mesa com vibração hálpica.',
      },
    ],
    slugs_relacionados: ['geometria-da-parede-tripode'],
    categoria_slug: 'arbitragem',
    categoria_nome: 'Arbitragem Assistida',
    trilha: 'velocidade',
  },
  {
    id: 104,
    slug: 'estetica-sonora-e-transmissao-de-bouts',
    titulo: 'A Estética Sonora e a Transmissão Independente dos Bouts',
    subtitulo: 'Capturando o estalo dos patins e o clamor das arquibancadas para transmissões abertas',
    categoria_id: 4,
    resumo: 'Como os coletivos de transmissão constroem a identidade áudio-visual das ligas sul-americanas.',
    tempo_leitura: '7 min de leitura',
    data: '25 FEV 2047',
    autor: 'Fernanda "Fuzz" Castro',
    autor_cargo: 'Diretora de Áudio da Rádio Derby',
    destaque: false,
    selo_editorial: 'Cultura Sonora',
    arquetipo_grafico: 'wave',
    aprendizados: [
      'Microfones direcionais na altura do piso captam os impactos de bloqueio com clareza visceral.',
      'A narração estilo rádio ao vivo amplia a acessibilidade do esporte.',
    ],
    secoes: [
      {
        titulo: 'Texturas de Som da Pista',
        texto: 'O som de um bout não é barulho de fundo; é o coração da partida. O atrito das rodas no piso de cimento polido e o estalar dos protetores acrílicos definem o ritmo do jogo.',
      },
    ],
    slugs_relacionados: ['manifesto-do-zines-de-derby'],
    categoria_slug: 'transmissao',
    categoria_nome: 'Transmissão & Som',
    trilha: 'expressao',
  },
  {
    id: 105,
    slug: 'manifesto-do-zines-de-derby',
    titulo: 'Manifesto dos Zines de Pista e a Memória do Esporte',
    subtitulo: 'A preservação física da história das ligas através da publicação autogerida',
    categoria_id: 5,
    resumo: 'Em um mundo digitalizado, a cultura de zines impressos em risografia continua viva nas arquibancadas.',
    tempo_leitura: '4 min de leitura',
    data: '14 FEV 2047',
    autor: 'Marina "Ink" Prado',
    autor_cargo: 'Editora do Zine Pista Limpa',
    destaque: false,
    selo_editorial: null,
    arquetipo_grafico: 'book',
    aprendizados: [
      'Os zines documentam os bastidores e os nomes de guerra das atletas desde os anos 2000.',
      'A troca de fanzines entre ligas cria pontes de apoio mútuo.',
    ],
    secoes: [
      {
        titulo: 'Tinta sobre Tática',
        texto: 'Entre um jam e outro, os zines passam de mão em mão no ginásio. Desenhos técnicos de formações defensivas misturam-se com poesias sobre tombos e vitórias comunitárias.',
      },
    ],
    slugs_relacionados: ['estetica-sonora-e-transmissao-de-bouts'],
    categoria_slug: 'cultura-escrita',
    categoria_nome: 'Cultura & Zines',
    trilha: 'expressao',
  },
];

// In-memory store
let categoriesStore = [...INITIAL_CATEGORIES];
let contentsStore = [...INITIAL_CONTENTS];
let nextContentId = 200;

export function getCategoriesFromStore(): CategoriaDaApi[] {
  return categoriesStore;
}

export function getContentsFromStore(filters?: {
  trilha?: string;
  categoria_id?: number;
  busca?: string;
}): ConteudoDaApi[] {
  let list = [...contentsStore];

  if (filters?.trilha) {
    list = list.filter((item) => item.trilha === filters.trilha);
  }

  if (filters?.categoria_id) {
    list = list.filter((item) => item.categoria_id === filters.categoria_id);
  }

  if (filters?.busca?.trim()) {
    const term = filters.busca.trim().toLowerCase();
    list = list.filter(
      (item) =>
        item.titulo.toLowerCase().includes(term) ||
        item.subtitulo.toLowerCase().includes(term) ||
        item.resumo.toLowerCase().includes(term) ||
        item.autor.toLowerCase().includes(term)
    );
  }

  return list;
}

export function getContentBySlugFromStore(slug: string): ConteudoDaApi | null {
  return contentsStore.find((item) => item.slug === slug) || null;
}

export function getContentByIdFromStore(id: number): ConteudoDaApi | null {
  return contentsStore.find((item) => item.id === id) || null;
}

export function createContentInStore(dto: any): ConteudoDaApi {
  const cat = categoriesStore.find((c) => c.id === Number(dto.categoria_id)) || categoriesStore[0];
  const newId = ++nextContentId;

  const newEntry: ConteudoDaApi = {
    id: newId,
    slug: dto.slug || `ensaio-${newId}`,
    titulo: dto.titulo || 'Sem Título',
    subtitulo: dto.subtitulo || '',
    categoria_id: cat.id,
    resumo: dto.resumo || '',
    tempo_leitura: dto.tempo_leitura || '5 min de leitura',
    data: dto.data || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
    autor: dto.autor || 'Redação Synthetica',
    autor_cargo: dto.autor_cargo || 'Editora',
    destaque: Boolean(dto.destaque),
    selo_editorial: dto.selo_editorial || null,
    arquetipo_grafico: dto.arquetipo_grafico || 'star',
    aprendizados: dto.aprendizados || [],
    secoes: dto.secoes || [],
    slugs_relacionados: dto.slugs_relacionados || [],
    categoria_slug: cat.slug,
    categoria_nome: cat.nome,
    trilha: cat.trilha,
  };

  contentsStore.unshift(newEntry);
  return newEntry;
}

export function updateContentInStore(id: number, dto: any): ConteudoDaApi | null {
  const index = contentsStore.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const cat = categoriesStore.find((c) => c.id === Number(dto.categoria_id)) || categoriesStore[0];

  const updated: ConteudoDaApi = {
    ...contentsStore[index],
    slug: dto.slug,
    titulo: dto.titulo,
    subtitulo: dto.subtitulo,
    categoria_id: cat.id,
    resumo: dto.resumo,
    tempo_leitura: dto.tempo_leitura,
    data: dto.data,
    autor: dto.autor,
    autor_cargo: dto.autor_cargo,
    destaque: Boolean(dto.destaque),
    selo_editorial: dto.selo_editorial || null,
    arquetipo_grafico: dto.arquetipo_grafico || 'star',
    aprendizados: dto.aprendizados || [],
    secoes: dto.secoes || [],
    slugs_relacionados: dto.slugs_relacionados || [],
    categoria_slug: cat.slug,
    categoria_nome: cat.nome,
    trilha: cat.trilha,
  };

  contentsStore[index] = updated;
  return updated;
}

export function deleteContentFromStore(id: number): boolean {
  const index = contentsStore.findIndex((item) => item.id === id);
  if (index === -1) return false;
  contentsStore.splice(index, 1);
  return true;
}
