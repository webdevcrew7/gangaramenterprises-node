import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // For all admin routes, add no-cache headers to prevent back/forward cache issues
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: '/admin/:path*',
};

