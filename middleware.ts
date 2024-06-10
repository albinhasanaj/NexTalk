import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from 'jose';

const secret = process.env.NEXTAUTH_SECRET;
const jwt_secret = process.env.JWT_SECRET;

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const session = await getToken({ req, secret });

    const url = req.nextUrl.clone();
    const path = url.pathname;

    if (token) {
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(jwt_secret));
            if (payload) {
                // Valid token, redirect if on login or signup page
                if (path === "/login" || path === "/signup") {
                    url.pathname = '/chatpage';
                    return NextResponse.redirect(url);
                }
                return NextResponse.next();
            }
        } catch (error) {
            console.error("JWT verification error:", error);
            // Clear the token by setting an expired cookie
            const response = NextResponse.redirect(url.origin + '/login');
            response.headers.append('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
            return response;
        }
    }

    // Handle unauthenticated access to protected content
    if (!session && path.includes("/chatpage")) {
        url.pathname = '/login';
        return NextResponse.redirect(url.origin + url.pathname);
    }

    // Redirect logged-in users away from login/signup
    if ((token || session) && (path === "/login" || path === "/signup")) {
        url.pathname = '/chatpage';
        return NextResponse.redirect(url.origin + url.pathname);
    }

    return NextResponse.next();
}
