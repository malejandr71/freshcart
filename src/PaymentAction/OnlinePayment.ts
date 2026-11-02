"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function OnlinePaymentAction(cartId: string, value: object) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }


    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`, value, {
        headers: {
            token: token as string
        }
    })

    return data
}
