import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "fynk_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.redirect(new URL("/admin/login?error=config", req.url));
  }

  const session = req.cookies.get(ADMIN_COOKIE)?.value;
  if (session === adminPassword) {
    return NextResponse.next();
  }

  const login = new URL("/admin/login", req.url);
  login.searchParams.set("from", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*"],
};
