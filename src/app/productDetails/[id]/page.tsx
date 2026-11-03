import { getSingleProducts } from '@/apis/products'
import { Product } from '@/types/product.t'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RxStarFilled } from 'react-icons/rx'
import { FaTruck, FaUndoAlt, FaShieldAlt } from 'react-icons/fa'
import CartBtn from '@/app/_components/CartBtn/CartBtn'
import WishlistBtn from '@/app/_components/WishlistBtn/WishlistBtn'
import Reviews from '@/app/_components/Reviews/Reviews'
import HomeCard from '@/app/_components/HomeCard/HomeCard'
import { getProductsByCategory } from '@/apis/products'

const ProductData = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const data: Product = await getSingleProducts(id)

    console.log(data);

    const related: Product[] = await getProductsByCategory(data?.category?._id)
    const relatedProducts = related.filter(function (product: Product) {
        return product.id !== data?.id
    }).slice(0, 5)

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
                    <div className='grid grid-cols-4 gap-3 mt-3'>
                        {data?.images?.slice(0, 4).map(function (img: string, idx: number) {
                            return <div key={idx} className='bg-white border border-slate-200 rounded-xl p-2'>
                                <Image src={img} alt={data?.title} width={150} height={150} className='w-full h-20 object-contain' />
                            </div>
                        })}
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

                        <div className='flex gap-3 items-center'>
                            <div className='flex-1'><CartBtn id={data?.id} full /></div>
                            <WishlistBtn id={data?.id} />
                        </div>

                        <div className='grid grid-cols-3 gap-3 mt-8 text-sm'>
                            <div className='bg-slate-50 rounded-xl p-3 flex items-center gap-2'><FaTruck className='text-green-600' /> Free Delivery</div>
                            <div className='bg-slate-50 rounded-xl p-3 flex items-center gap-2'><FaUndoAlt className='text-green-600' /> 14 Days Return</div>
                            <div className='bg-slate-50 rounded-xl p-3 flex items-center gap-2'><FaShieldAlt className='text-green-600' /> Secure Payment</div>
                        </div>
                    </div>
                </div>
            </div>

            <Reviews id={data?.id} />

            {relatedProducts.length > 0 && <div className='mt-14'>
                <h2 className='text-2xl font-bold mb-6 border-s-4 border-green-600 ps-3'>Related <span className='text-green-600'>Products</span></h2>
                <div className='grid grid-cols-12 xl:grid-cols-5 gap-5'>
                    {relatedProducts.map(function (product: Product, idx: number) {
                        return <HomeCard product={product} key={idx} />
                    })}
                </div>
            </div>}
        </div>
    )
}

export default ProductData
