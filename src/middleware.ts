import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  // For now, this will allow access to all dashboard routes
  // Replace this with your actual authentication logic when ready
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // Redirect to the home page or login page
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
