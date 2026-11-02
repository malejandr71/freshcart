import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })



    const { pathname } = request.nextUrl

    const authPage = ["/login", "/register"]

    // Home, productDetails, brands, categories => public (no login needed)
    // login is required only for cart, wishlist and buying (payment / orders)
    const routes = ["/cart", "/wishlist", "/payment", "/allorders"]



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
    matcher: ["/cart", "/wishlist", "/payment", "/allorders", "/login", "/register"],
}
