import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    console.log('girdi')

    let apiToken = sessionStorage.getItem("api_token")
        || localStorage.getItem("api_token");


    if (!apiToken) {
        return NextResponse.rewrite(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};