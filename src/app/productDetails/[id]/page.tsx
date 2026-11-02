import { getSingleProducts } from '@/apis/products'
import { Product } from '@/types/product.t'
import Image from 'next/image'
import React from 'react'
import { RxStarFilled } from 'react-icons/rx'
import CartBtn from '@/app/_components/CartBtn/CartBtn'

const ProductData = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const data: Product = await getSingleProducts(id)

    console.log(data);

    return (
        <div className='my-12 w-full md:w-[80%] mx-auto px-5'>

            <div className='grid grid-cols-12'>

                <div className="col-span-12 md:col-span-4">
                    <Image src={data?.imageCover} alt={data?.title} width={500} height={500} className='w-full' />
                </div>

                <div className="col-span-12 md:col-span-8">
                    <div className='p-5'>
                        <h1 className='text-4xl mb-5 text-green-600'>{data?.title}</h1>
                        <p className='text-lg mb-5 '>{data?.description}</p>
                        <p className='my-2 text-green-500'>{data?.price} EGP</p>
                        <p className='mb-3'>{data?.ratingsAverage} <RxStarFilled className='text-yellow-500 inline' /></p>

                        <CartBtn id={data?.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductData
