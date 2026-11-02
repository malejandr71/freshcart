import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })



    const { pathname } = request.nextUrl

    const authPage = ["/login", "/register"]

    const routes = ["/", "/productDetails", "/cart", "/categories", "/brands", "/payment", "/allorders"]



    if (!token && routes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && authPage.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/productDetails/:path*", "/cart", "/categories", "/brands", "/payment", "/allorders", "/login", "/register"],
}
