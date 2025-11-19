import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers"

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public paths that don't require authentication
    const publicPaths = ["/login", "/signup", "/api/auth"];
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    // if (isPublicPath) {
    //     return NextResponse.next();
    // }

    // Check authentication
    // try {

        // const session = await auth.api.getSession({ headers: request.headers });
        // const session = await auth.api.getSession({ headers: await headers() })

        // if (!session) {
        //     const loginUrl = new URL("/login", request.url);
        //     loginUrl.searchParams.set("from", pathname);
        //     return NextResponse.redirect(loginUrl);
        // }

        return NextResponse.next();
    // } catch (error) {
    //     console.error("Auth error details:", error);
    //     const loginUrl = new URL("/login", request.url);
    //     return NextResponse.redirect(loginUrl);
    // }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
};
