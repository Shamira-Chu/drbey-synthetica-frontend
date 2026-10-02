import { NextRequest, NextResponse } from 'next/server';
import { getContentsFromStore, createContentInStore } from '@/data/seedContent';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trilha = searchParams.get('trilha') || undefined;
  const categoria_id = searchParams.get('categoria_id')
    ? Number(searchParams.get('categoria_id'))
    : undefined;
  const busca = searchParams.get('busca') || undefined;

  const contents = getContentsFromStore({ trilha, categoria_id, busca });
  return NextResponse.json(contents);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.titulo || !body.slug) {
      return NextResponse.json({ detail: 'Título e slug são obrigatórios.' }, { status: 422 });
    }
    const created = createContentInStore(body);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ detail: 'Corpo da requisição inválido.' }, { status: 400 });
  }
}
