import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// // This is your secret used for NextAuth
// const secret = process.env.NEXTAUTH_SECRET;

// export default async function middleware(req: NextRequest) {
//     const token = req.cookies.get("token"); // Your custom JWT
//     const session = await getToken({ req, secret }); // NextAuth session token

//     // Redirection URL for logged-in users trying to access login/signup
//     const url = req.nextUrl.clone();
//     const path = url.pathname;

//     // If user is logged in and trying to access login or signup pages
//     if ((token || session) && (path === "/login" || path === "/signup")) {
//         url.pathname = '/chatpage'; // Redirect to chat page if logged in
//         return NextResponse.redirect(url);
//     }

//     // If user is trying to access protected content and is not logged in
//     if (!token && !session && path.includes("/chatpage")) {
//         url.pathname = '/login'; // Redirect to login if trying to access protected routes
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }
export default async function middleware(req: NextRequest) {
    return NextResponse.next();
}