import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin-token')?.value;
  
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin-login';
  
  if (isAdminRoute && !token && !isLoginPage) {
    const loginUrl = new URL('/admin-login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  if (isLoginPage && token) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin-login'],
};