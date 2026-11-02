"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addToWishlistAction(id: string) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }

    const values = {
        productId: id
    }

    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", values, {
        headers: {
            token: token as string
        }
    })

    return data
}
