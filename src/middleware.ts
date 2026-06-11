import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isValidToken = (token: string): boolean => {
  return token && token.length > 20;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let token = request.cookies.get('admin-token')?.value;
  
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  const isLoginPage = pathname === '/admin-login';
  
  const hasValidToken = token && isValidToken(token);
  
  console.log('🔐 Middleware:', { 
    pathname, 
    hasToken: !!token, 
    hasValidToken,
    tokenPreview: token ? `${token.substring(0, 20)}...` : 'none',
    isAdminRoute, 
    isLoginPage 
  });
  
  if (token && !hasValidToken) {
    console.log('🧹 Token invalide détecté, nettoyage...');
    const response = NextResponse.next();
    response.cookies.delete('admin-token');
    return response;
  }
  
  if (isAdminRoute && !hasValidToken) {
    console.log('➡️ Redirection vers login (token invalide ou absent)');
    const loginUrl = new URL('/admin-login', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('admin-token');
    return response;
  }
  
  if (isLoginPage && hasValidToken) {
    console.log('➡️ Redirection vers admin (token valide présent)');
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }
  
  if (isLoginPage && !hasValidToken) {
    console.log('✅ Affichage page login');
    return NextResponse.next();
  }
  
  if (isAdminRoute && hasValidToken) {
    console.log('✅ Accès admin autorisé');
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/admin-login'],
};