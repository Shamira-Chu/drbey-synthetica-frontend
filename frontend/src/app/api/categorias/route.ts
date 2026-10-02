import { NextResponse } from 'next/server';
import { getCategoriesFromStore } from '@/data/seedContent';

export async function GET() {
  const categories = getCategoriesFromStore();
  return NextResponse.json(categories);
}
