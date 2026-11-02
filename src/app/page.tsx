import React from 'react'
import { getAllProduct } from '@/apis/products'
import { Product } from '@/types/product.t'
import HomeCard from './_components/HomeCard/HomeCard'
import MainSlider from './_components/MainSlider/MainSlider'
import Categories from './_components/Categories/Categories'
import Features from './_components/Features/Features'

const Products = async () => {

    const data: Product[] = await getAllProduct()

    console.log(data);

    return (
        <>
            <MainSlider />

            <Features />

            <Categories />

            <div className='my-10'>

                <div className='p-5 w-full md:w-[90%] mx-auto'>

                    <h1 className='text-3xl font-bold mb-8 border-s-4 border-green-600 ps-3'>Featured <span className='text-green-600'>Products</span></h1>

                    <div className='grid grid-cols-12 xl:grid-cols-5 gap-5'>

                        {data.map(function (product: Product, idx: number) {
                            return <HomeCard product={product} key={idx} />
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
