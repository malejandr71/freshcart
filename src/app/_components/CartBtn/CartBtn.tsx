

"use client"

import { Button } from '@/components/ui/button'
import { cartContext } from '@/Context/CartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

const CartBtn = ({ id }: { id: string }) => {

    const { addProductCart } = useContext(cartContext)


    async function addProductToCart() {
        const data = await addProductCart(id)


        if (data?.status === "success") {

            toast.success(data.message, {
                position: "top-center"
            })
        } else {
            toast.error(
                "Product added faild to your cart", {
                position: "top-center"
            })
        }

    }



    return (
        <>
            <Button onClick={addProductToCart} className="w-full">Add to Cart</Button>
        </>
    )
}

export default CartBtn
