import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { validAdminRoles } from './utils/validUserRoles';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/checkout')) {
    return checkoutMiddleware(req);
  }

  if (pathname.startsWith('/admin')) {
    return adminMiddleware(req);
  }

  if (pathname.startsWith('/api/admin')) {
    return apiAdminMiddleware(req);
  }
}

const checkoutMiddleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();

  // old version

  // const previousPage = req.nextUrl.pathname;
  // const token = req.cookies.get(COOKIE_TOKEN_KEY)?.value;

  // try {
  //   await jwtVerify(token!, new TextEncoder().encode(TOKEN_SECRET_SEED));
  //   return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect(
  //     new URL(`/auth/login?p=${previousPage}`, req.url)
  //   );
  // }
};

const adminMiddleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const requestedPage = req.nextUrl.pathname;

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  if (!validAdminRoles.includes((session.user as any).role)) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const apiAdminMiddleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  if (!validAdminRoles.includes((session.user as any).role)) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
