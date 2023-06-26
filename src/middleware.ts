import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE_TOKEN_KEY, TOKEN_SECRET_SEED } from './utils/constans';

import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/checkout')) {
    return checkoutMiddleware(req);
  }
}

const checkoutMiddleware = async (req: NextRequest) => {
  const previousPage = req.nextUrl.pathname;
  const token = req.cookies.get(COOKIE_TOKEN_KEY)?.value;

  try {
    await jwtVerify(token!, new TextEncoder().encode(TOKEN_SECRET_SEED));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/auth/login?p=${previousPage}`, req.url)
    );
  }
};
export const config = {
  matcher: ['/checkout/:path*'],
};
