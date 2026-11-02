"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";


export async function getUserCartAction() {


    const token = await getMyToken()


    if (!token) {
        throw new Error("Login First")
    }


    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v2/cart", {
        headers: {
            token: token as string
        }
    })

    return data
}
