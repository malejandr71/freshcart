"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function getWishlistAction() {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }

    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: token as string
        }
    })

    return data
}
