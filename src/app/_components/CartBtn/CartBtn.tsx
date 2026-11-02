

"use client"

import { Button } from '@/components/ui/button'
import { cartContext } from '@/Context/CartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'
import { FaPlus, FaShoppingCart } from 'react-icons/fa'

const CartBtn = ({ id, full = false }: { id: string, full?: boolean }) => {

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
            {full
                ? <Button onClick={addProductToCart} className="w-full h-12 rounded-lg text-base"><FaShoppingCart /> Add to Cart</Button>
                : <Button onClick={addProductToCart} size="icon" aria-label="Add to Cart" className="rounded-full size-10 shrink-0"><FaPlus /></Button>}
        </>
    )
}

export default CartBtn
