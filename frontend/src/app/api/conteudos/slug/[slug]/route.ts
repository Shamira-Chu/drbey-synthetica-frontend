import { NextRequest, NextResponse } from 'next/server';
import { getContentBySlugFromStore } from '@/data/seedContent';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const content = getContentBySlugFromStore(slug);

  if (!content) {
    return NextResponse.json({ detail: 'Ensaio não encontrado.' }, { status: 404 });
  }

  return NextResponse.json(content);
}
