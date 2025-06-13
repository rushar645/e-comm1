import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },{
        callbacks: {
    authorized: ({ token,req }) => {
        const {pathname} = req.nextUrl;
        // Allow access to the root path and public paths   

        if (pathname === '/' || 
            pathname.startsWith('/signup') ||
            pathname.startsWith('/api') ||
            pathname.startsWith('/login') ){

            return true;
        }

        if (pathname.startsWith('/admin')) {
            // Allow access to admin routes only if the user is authenticated
            return token?.isAdmin
        }

        return !!token;
    }
  }
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)',
    // Match all paths except for API routes, static files, and the login/signup pages
  ],
  };