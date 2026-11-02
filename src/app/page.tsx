import React from 'react'
import { getAllProduct } from '@/apis/products'
import { Product } from '@/types/product.t'
import HomeCard from './_components/HomeCard/HomeCard'
import MainSlider from './_components/MainSlider/MainSlider'
import Categories from './_components/Categories/Categories'

const Products = async () => {

    const data: Product[] = await getAllProduct()

    console.log(data);

    return (
        <>
            <MainSlider />

            <Categories />

            <div className='my-10'>

                <div className='p-5 w-full md:w-[80%] mx-auto'>

                    <h1 className='text-3xl text-green-700 mb-5 text-center'>Products</h1>

                    <div className='grid grid-cols-12 gap-3'>

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
