"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";


export async function deleteCartItemAction(id: string) {


    const token = await getMyToken()


    if (!token) {
        throw new Error("Login First")
    }


    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
        headers: {
            token: token as string
        }
    })

    return data
}
