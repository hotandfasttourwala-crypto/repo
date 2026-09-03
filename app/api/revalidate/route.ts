import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json();
    if (!tag) return NextResponse.json({ error: 'Missing tag' }, { status: 400 });

    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
