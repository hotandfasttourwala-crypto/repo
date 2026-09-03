import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  const validPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === validPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return response;
  }
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}