import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getMyToken() {

    // on localhost (http) the cookie is "next-auth.session-token"
    // on Vercel (https) next-auth adds "__Secure-" before the name
    const x = (await cookies()).get("next-auth.session-token")?.value
        || (await cookies()).get("__Secure-next-auth.session-token")?.value

    const token = await decode({
        token: x,
        secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET!
    })


    return token?.token

}
