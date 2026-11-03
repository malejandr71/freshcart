"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function createReviewAction(id: string, values: { review: string, rating: number }) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }


    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`, values, {
        headers: {
            token: token as string
        }
    })

    return data
}
