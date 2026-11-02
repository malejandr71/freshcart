"use client"
import { getWishlistAction } from '@/WishlistAction/getWishlist'
import { removeWishlistAction } from '@/WishlistAction/removeWishlist'
import { Product } from '@/types/product.t'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import CartBtn from '../_components/CartBtn/CartBtn'

const Wishlist = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)

    async function getWishlist() {
        setIsLoading(true)
        try {
            const data = await getWishlistAction()
            setProducts(data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    async function removeWishlistItem(id: string) {
        try {
            await removeWishlistAction(id)
            setProducts(products.filter(function (product) { return product.id !== id }))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        getWishlist()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='my-12 w-full md:w-[90%] mx-auto p-5'>

            <h1 className='text-3xl font-bold mb-8 border-s-4 border-green-600 ps-3'>My <span className='text-green-600'>Wishlist</span></h1>

            {products.length === 0 ? <div className='text-center py-20'>
                <h2 className="text-3xl text-red-500 mb-5"> No Data to Diaplay It </h2>
                <Link href="/"><Button className='rounded-lg px-6 h-11'>Start Shopping</Button></Link>
            </div> :

                <div className='bg-white rounded-2xl border border-slate-200 p-5'>
                    {products.map(function (product: Product, idx: number) {
                        return <div key={idx} className="flex flex-wrap gap-4 justify-between items-center py-4 border-b border-green-700/20 last:border-0">
                            <div className='flex gap-4 items-center'>
                                <div className='bg-slate-50 rounded-xl p-2'>
                                    <Image src={product.imageCover} alt={product.title} width={100} height={100} className='size-24 object-contain' />
                                </div>
                                <div>
                                    <Link href={`/productDetails/${product.id}`} className='text-lg font-semibold mb-1 block hover:text-green-600'>{product.title}</Link>
                                    <p className='mb-2 text-green-600 font-bold'>Price : {product.price} EGP</p>
                                    <Button variant="ghost" size="sm" className='text-red-500 px-0 hover:bg-transparent hover:text-red-600' onClick={() => removeWishlistItem(product.id)}>Remove</Button>
                                </div>
                            </div>
                            <div className='w-48'>
                                <CartBtn id={product.id} full />
                            </div>
                        </div>
                    })}
                </div>}
        </div>
    )
}

export default Wishlist
