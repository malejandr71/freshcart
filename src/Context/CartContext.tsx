"use client"

import { addProductToCartAction } from '@/CartAction/addProdutCart'
import { clearCartAction } from '@/CartAction/clearCart'
import { getUserCartAction } from '@/CartAction/getUserCart'
import { removeCartItemAction } from '@/CartAction/removeCartItem'
import { updateCartCountAction } from '@/CartAction/updateCartCount'
import { Cart, CartProduct } from '@/types/cart.t'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'


interface CartContextType {
    products: CartProduct[]
    totalCartPrice: number
    totalCartItem: number
    cartId: string
    isLoading: boolean
    getUserCart: () => Promise<void>
    addProductCart: (id: string) => Promise<Cart | undefined>
    deleteCartItem: (id: string) => Promise<void>
    clearCart: () => Promise<void>
    updateCartCount: (id: string, count: number) => Promise<void>
    afterPayment: () => void
}

export const cartContext = createContext<CartContextType>({} as CartContextType)

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {


    const [products, setProducts] = useState<CartProduct[]>([])
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [totalCartItem, setTotalCartItem] = useState(0)
    const [cartId, setCartId] = useState("")
    const [isLoading, setIsLoading] = useState(true)



    async function getUserCart() {
        try {

            const data: Cart = await getUserCartAction()

            console.log(data);

            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)
            setCartId(data.cartId)

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }


    async function addProductCart(id: string) {

        try {
            const data = await addProductToCartAction(id)


            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)
            setCartId(data.cartId)


            return data
        } catch (error) {
            console.log(error);
        }
    }


    async function deleteCartItem(id: string) {
        try {
            const data: Cart = await removeCartItemAction(id)

            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)

            toast.success("Product removed successfully", { position: "top-center" })

        } catch (error) {
            console.log(error);
        }
    }

    async function clearCart() {
        try {
            const data = await clearCartAction()

            console.log(data);

            setProducts([])
            setTotalCartPrice(0)
            setTotalCartItem(0)

        } catch (error) {
            console.log(error);
        }
    }

    async function updateCartCount(id: string, count: number) {
        try {
            const data: Cart = await updateCartCountAction(id, count)

            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)

        } catch (error) {
            console.log(error);
        }
    }


    function afterPayment() {
        setProducts([])
        setTotalCartPrice(0)
        setTotalCartItem(0)
        setCartId("")
    }

    useEffect(function () {
        getUserCart()
    }, [])



    return (
        <cartContext.Provider value={
            {
                totalCartItem,
                totalCartPrice,
                products,
                cartId,
                isLoading,
                getUserCart,
                addProductCart,
                deleteCartItem,
                clearCart,
                updateCartCount,
                afterPayment
            }
        }>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider
