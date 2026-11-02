import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getMyToken() {

    const x = (await cookies()).get("next-auth.session-token")?.value

    const token = await decode({
        token: x,
        secret: process.env.AUTH_SECRET!
    })


    return token?.token

}
