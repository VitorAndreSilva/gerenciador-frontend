import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value

    const isAuthPage = request.nextUrl.pathname.startsWith("/login") || 
    request.nextUrl.pathname.startsWith("/register")

    const isPrivatePage = request.nextUrl.pathname.startsWith("/produtos/criar");

    if (!token && isPrivatePage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/produtos/criar/:path*", "/login", "/register"]
}