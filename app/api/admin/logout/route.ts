import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the admin_session cookie (matches middleware check)
  response.cookies.set('admin_session', '', {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
  });

  // Also clear legacy 'admin' cookie if it exists
  response.cookies.set('admin', '', {
    path: '/',
    expires: new Date(0),
  });

  // Prevent caching
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');

  return response;
}
