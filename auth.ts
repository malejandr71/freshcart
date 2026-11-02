import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


export const authOptions: AuthOptions = {

    pages: {
        signIn: "/login"
    },

    providers: [
        Credentials({
            name: 'Credentials',

            credentials: {
                email: { label: "email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            authorize: async function (credentials) {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })

                const payload = await response.json()

                console.log(payload);
                //   user: { name: 'Huda Khaled', email: 'huda.route@gmail.com', role: 'user' }

                if (payload.message === 'success') {

                    const { id }: { id: string } = jwtDecode(payload.token)

                    return {
                        id: id,
                        user: payload.user,
                        token: payload.token
                    }
                }


                throw new Error(payload.message)

            }
        })
    ],

    callbacks: {

        async jwt({ token, user }) {

            if (user) {
                token.token = user?.token
                token.user = user?.user
            }

            return token
        },

        async session({ session, token }) {

            if (token) {
                session.user = token.user
            }

            return session
        }
    }

}
