import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })



    const { pathname } = request.nextUrl

    const authPage = ["/login", "/register", "/forgotpassword"]

    const routes = ["/cart", "/wishlist", "/payment", "/allorders", "/profile"]



    if (!token && routes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && authPage.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ["/cart", "/wishlist", "/payment", "/allorders", "/profile", "/login", "/register", "/forgotpassword"],
}
