"use client"

import { addProductToCartAction } from '@/CartAction/addProdutCart'
import { clearCartItemAction } from '@/CartAction/clearCart'
import { getUserCartAction } from '@/CartAction/getUserCart'
import { deleteCartItemAction } from '@/CartAction/removeCartItem'
import { updateCartCountAction } from '@/CartAction/updateCartCount'
import { Cart, CartProduct } from '@/types/cart.t'
import React, { createContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'


interface CartContextType {
    products: CartProduct[]
    totalCartPrice: number
    totalCartItem: number
    CartId: string
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
    const [CartId, setCartId] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    async function getUserCart() {
        setIsLoading(true)
        try {

            const data: Cart = await getUserCartAction()

            console.log(data);

            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)
            setCartId(data.cartId)

            setIsLoading(false)

        } catch (error) {
            console.log(error);

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
            const data: Cart = await deleteCartItemAction(id)

            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)

        } catch (error) {
            console.log(error);
        }
    }

    async function clearCart() {
        try {
            const data = await clearCartItemAction()

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
    }

    const { status } = useSession()

    useEffect(function () {
        if (status === "authenticated") {
            getUserCart()
        }
    }, [status])



    return (
        <cartContext.Provider value={
            {
                totalCartItem,
                totalCartPrice,
                products,
                CartId,
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
