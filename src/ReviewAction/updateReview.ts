"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function updateReviewAction(id: string, values: { review: string, rating: number }) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }


    try {
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/reviews/${id}`, values, {
            headers: {
                token: token as string
            }
        })

        return data

    } catch (error) {
        // return the API message (ex: "You already reviewed this product")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (error as any)?.response?.data
    }
}
