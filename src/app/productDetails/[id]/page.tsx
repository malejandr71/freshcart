import { getSingleProducts } from '@/apis/products'
import { Product } from '@/types/product.t'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RxStarFilled } from 'react-icons/rx'
import { FaTruck, FaUndoAlt, FaShieldAlt } from 'react-icons/fa'
import CartBtn from '@/app/_components/CartBtn/CartBtn'

const ProductData = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const data: Product = await getSingleProducts(id)

    console.log(data);

    return (
        <div className='my-12 w-full md:w-[90%] mx-auto px-5'>

            <p className='text-sm text-slate-500 mb-6'>
                <Link href="/" className='hover:text-green-600'>Home</Link> / <span>{data?.category?.name}</span> / <span className='text-slate-800'>{data?.title}</span>
            </p>

            <div className='grid grid-cols-12 gap-8'>

                <div className="col-span-12 md:col-span-5">
                    <div className='bg-white border border-slate-200 rounded-2xl p-5'>
                        <Image src={data?.imageCover} alt={data?.title} width={500} height={500} className='w-full max-h-[500px] object-contain' />
                    </div>
                </div>

                <div className="col-span-12 md:col-span-7">
                    <div className='p-5'>
                        <div className='flex gap-2 mb-3 text-xs'>
                            <span className='bg-green-50 text-green-700 px-3 py-1 rounded-full'>{data?.category?.name}</span>
                            <span className='bg-slate-100 text-slate-700 px-3 py-1 rounded-full'>{data?.brand?.name}</span>
                        </div>
                        <h1 className='text-3xl font-bold mb-3'>{data?.title}</h1>
                        <p className='mb-4 text-slate-600'>{data?.ratingsAverage} <RxStarFilled className='text-yellow-500 inline' /> <span className='text-sm'>({data?.ratingsQuantity} reviews)</span></p>
                        <p className='my-2 text-green-600 text-3xl font-bold mb-5'>{data?.price} EGP</p>
                        <p className='text-slate-600 leading-7 mb-6'>{data?.description}</p>

                        <CartBtn id={data?.id} full />

                        <div className='grid grid-cols-3 gap-3 mt-8 text-sm'>
                            <div className='bg-slate-50 rounded-xl p-3 flex items-center gap-2'><FaTruck className='text-green-600' /> Free Delivery</div>
                            <div className='bg-slate-50 rounded-xl p-3 flex items-center gap-2'><FaUndoAlt className='text-green-600' /> 14 Days Return</div>
                            <div className='bg-slate-50 rounded-xl p-3 flex items-center gap-2'><FaShieldAlt className='text-green-600' /> Secure Payment</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductData
