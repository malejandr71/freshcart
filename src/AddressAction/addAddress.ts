"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addAddressAction(values: { name: string, details: string, phone: string, city: string }) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }


    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`, values, {
        headers: {
            token: token as string
        }
    })

    return data
}
