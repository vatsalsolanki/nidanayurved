import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;

  // Skip special paths and static files
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If the pathname doesn't have a locale and we're not on the root path,
  // we still want to handle it properly for English (default locale)
  if (!pathnameHasLocale) {
    // Pass the pathname in headers to allow layout.tsx to detect the current path
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-locale', 'en'); // Default locale
    return response;
  }

  // For paths with locale prefix, extract and pass the locale
  const locale = pathname.split('/')[1];
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  response.headers.set('x-locale', locale);
  
  return response;
}

// Only run middleware on specified paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any files with extensions (.jpg, .png, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};