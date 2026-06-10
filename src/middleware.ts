import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/admin/dashboard', '/admin/events', '/admin/sessions', '/admin/speakers', '/admin/rooms'];

const publicAdminRoutes = ['/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicAdminRoute = publicAdminRoutes.some(route => pathname.startsWith(route));
  
  const token = request.cookies.get('admin_token')?.value;
  
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  if (pathname === '/admin/login' && token) {
    const dashboardUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};