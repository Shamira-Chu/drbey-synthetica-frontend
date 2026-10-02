import { NextRequest, NextResponse } from 'next/server';
import {
  getContentByIdFromStore,
  updateContentInStore,
  deleteContentFromStore,
} from '@/data/seedContent';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const content = getContentByIdFromStore(Number(id));

  if (!content) {
    return NextResponse.json({ detail: 'Ensaio não encontrado.' }, { status: 404 });
  }

  return NextResponse.json(content);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = updateContentInStore(Number(id), body);

    if (!updated) {
      return NextResponse.json({ detail: 'Ensaio não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ detail: 'Corpo da requisição inválido.' }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const success = deleteContentFromStore(Number(id));

  if (!success) {
    return NextResponse.json({ detail: 'Ensaio não encontrado.' }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
