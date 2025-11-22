import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define public paths
  const publicPaths = ["/login", "/signup", "/api/auth"];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  // 2. Check for the session cookie
  // Better Auth usually uses "better-auth.session_token" or just "session_token"
  // We check for both just in case.
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("session_token");

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Allow the request to proceed
  // The actual DB validation will happen in your Page/Layout (Server Component)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
