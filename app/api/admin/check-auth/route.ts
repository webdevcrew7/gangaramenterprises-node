import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Prevent Next.js from caching this route

export async function GET() {
  const session = await getSession();

  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401, headers }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: session,
  }, { headers });
}
