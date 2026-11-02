

"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";



export async function addProductToCartAction(id: string) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }

    const values = {
        productId: id
    }



    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v2/cart", values, {

        headers: {
            token: token as string
        }
    })


    return data
}
