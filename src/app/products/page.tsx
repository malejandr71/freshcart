import { getProductsByFilter } from '@/apis/products'
import { Product } from '@/types/product.t'
import Link from 'next/link'
import React from 'react'
import PageHeader from '../_components/PageHeader/PageHeader'
import HomeCard from '../_components/HomeCard/HomeCard'

// Shop page => all products with pagination (page) + search by title (keyword)
const Shop = async ({ searchParams }: { searchParams: Promise<{ page?: string, keyword?: string }> }) => {

    const { page = "1", keyword = "" } = await searchParams

    let products: Product[] = []
    let numberOfPages = 1

    if (keyword) {
        // the API has no search endpoint => get all products then filter by title
        const { data }: { data: Product[] } = await getProductsByFilter("limit=1000")
        products = data.filter(function (product: Product) {
            return product.title.toLowerCase().includes(keyword.toLowerCase())
        })
    } else {
        const data = await getProductsByFilter(`limit=20&page=${page}`)
        products = data.data
        numberOfPages = data.metadata.numberOfPages
    }

    return (
        <>
            <PageHeader title={keyword ? `Search: ${keyword}` : 'All Products'} desc={`${products.length} products`} crumb='Shop' />

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
