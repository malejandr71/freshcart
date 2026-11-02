"use client"

import { addToWishlistAction } from '@/WishlistAction/addToWishlist'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { toast } from 'sonner'

const WishlistBtn = ({ id }: { id: string }) => {

    const { status } = useSession()

    const router = useRouter()

    async function addProductToWishlist() {

        // login is required only here (wishlist)
        if (status !== "authenticated") {
            toast.error("Login First", { position: "top-center" })
            router.push("/login")
            return
        }

        try {
            const data = await addToWishlistAction(id)

            if (data.status === "success") {
                toast.success(data.message, { position: "top-center" })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={addProductToWishlist} aria-label="Add to Wishlist" className='bg-white shadow rounded-full size-8 flex items-center justify-center text-slate-600 hover:text-red-500 cursor-pointer'>
            <FaRegHeart />
        </button>
    )
}

export default WishlistBtn
