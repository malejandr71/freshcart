import { getProductsPage, searchProducts } from '@/apis/products'
import { Product } from '@/types/product.t'
import Link from 'next/link'
import React from 'react'
import HomeCard from '../_components/HomeCard/HomeCard'

const Shop = async ({ searchParams }: { searchParams: Promise<{ page?: string, keyword?: string }> }) => {

    const { page = "1", keyword = "" } = await searchParams

    let products: Product[] = []
    let numberOfPages = 1

    if (keyword) {
        products = await searchProducts(keyword)
    } else {
        const { data, metadata } = await getProductsPage(page)
        products = data
        numberOfPages = metadata.numberOfPages
    }

    return (
        <>
            <div className='bg-gradient-to-r from-green-600 to-green-400 text-white py-12'>
                <div className='w-full md:w-[90%] mx-auto px-5'>
                    <p className='text-sm mb-4 text-white/80'>
                        <Link href="/">Home</Link> / <span className='text-white'>Shop</span>
                    </p>
                    <h1 className='text-4xl font-bold mb-2'>{keyword ? `Search: ${keyword}` : 'All Products'}</h1>
                    <p className='text-white/80'>{products.length} products</p>
                </div>
            </div>

            <div className='p-5 my-8 w-full md:w-[90%] mx-auto'>

                {products.length === 0 ? <h2 className='text-3xl text-center text-red-500 py-10'>No Data to Diaplay It</h2> :
                    <div className='grid grid-cols-12 xl:grid-cols-5 gap-5'>
                        {products.map(function (product: Product, idx: number) {
                            return <HomeCard product={product} key={idx} />
                        })}
                    </div>}

                {!keyword && numberOfPages > 1 && <div className='flex justify-center gap-2 mt-10'>
                    {Array.from({ length: numberOfPages }, (_, i) => i + 1).map(function (num: number) {
                        return <Link key={num} href={`/products?page=${num}`} className={`size-10 rounded-full flex items-center justify-center border ${String(num) === page ? "bg-green-600 text-white border-green-600" : "bg-white hover:border-green-600"}`}>{num}</Link>
                    })}
                </div>}
            </div>
        </>
    )
}

export default Shop
