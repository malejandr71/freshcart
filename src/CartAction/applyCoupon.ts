"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function applyCouponAction(couponName: string) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }


    const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v2/cart/applyCoupon`, { couponName }, {
        headers: {
            token: token as string
        }
    })

    return data
}
