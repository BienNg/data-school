import { NextResponse, type NextRequest } from 'next/server';
import { serverClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const db = await serverClient();
  await db.auth.signOut();
  return NextResponse.redirect(new URL('/admin/login', req.url), { status: 303 });
}
