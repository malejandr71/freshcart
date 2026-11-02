"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function CahPaymentAction(cartId: string, value: object) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }


    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, value, {
        headers: {
            token: token as string
        }
    })

    return data
}
