import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {

    const token = await getToken({req: request})
    const currentUrl = request.nextUrl

    if(token && (
        currentUrl.pathname.startsWith('/sign-in') ||
        currentUrl.pathname.startsWith('/sign-up') ||
        currentUrl.pathname.startsWith('/verify') ||
        currentUrl.pathname.startsWith('/')
    )) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    if(!token && currentUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL("/sign-in", request.url))
    }
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        // '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ],
}