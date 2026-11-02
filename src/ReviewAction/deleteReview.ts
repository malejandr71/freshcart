"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function deleteReviewAction(id: string) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }


    try {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/reviews/${id}`, {
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
