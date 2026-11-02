import React from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Product } from '@/types/product.t'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
import { FaSyncAlt, FaRegEye } from 'react-icons/fa'
import WishlistBtn from '../WishlistBtn/WishlistBtn'
import Link from 'next/link'
import Image from 'next/image'
import CartBtn from '../CartBtn/CartBtn'


const HomeCard = ({ product }: { product: Product }) => {

    const discount = product.priceAfterDiscount ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100) : 0

    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-1">
            <Card className="group relative mx-auto w-full h-full !p-4 !gap-2 rounded-xl ring-0 border border-slate-200 shadow-none hover:shadow-lg transition">

                {discount > 0 && <span className='absolute top-4 start-4 z-10 bg-red-500 text-white text-xs px-2 py-0.5 rounded'>-{discount}%</span>}

                <div className='absolute top-4 end-4 z-10 flex flex-col gap-2'>
                    <WishlistBtn id={product.id} />
                    <span className='bg-white shadow rounded-full size-8 flex items-center justify-center text-slate-600 hover:text-green-600'><FaSyncAlt className='text-xs' /></span>
                    <Link href={`/productDetails/${product.id}`} className='bg-white shadow rounded-full size-8 flex items-center justify-center text-slate-600 hover:text-green-600'><FaRegEye /></Link>
                </div>

                <Link href={`/productDetails/${product.id}`}>
                    <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={500}
                        height={500}
                        className='w-full h-60 object-contain'
                    />
                </Link>
                <CardHeader className='!p-0'>

                    <CardDescription className='text-slate-500 text-xs'>
                        {product.category.name}
                    </CardDescription>

                    <CardTitle className='font-medium text-base line-clamp-2'>{product.title.split(" ").slice(0, 2).join(" ")}</CardTitle>

                    <CardDescription className='flex items-center gap-1 text-xs'>
                        {[1, 2, 3, 4, 5].map(function (star: number) {
                            return star <= Math.round(product.ratingsAverage)
                                ? <IoIosStar key={star} className="text-yellow-400 text-base" />
                                : <IoIosStarOutline key={star} className="text-yellow-400 text-base" />
                        })}
                        <span className='ms-1'>{product.ratingsAverage} ({product.ratingsQuantity})</span>
                    </CardDescription>


                </CardHeader>
                <CardFooter className='!p-0 mt-auto flex justify-between items-center bg-transparent border-0'>
                    {product.priceAfterDiscount ? <p>
                        <span className='text-green-600 font-bold text-lg'>{product.priceAfterDiscount} EGP</span>
                        <span className='ms-2 text-xs line-through text-slate-400'>{product.price} EGP</span>
                    </p> : <p className='font-bold text-lg'>{product.price} EGP</p>}

                    <CartBtn id={product.id} />
                </CardFooter>
            </Card>
        </div>
    )
}

export default HomeCard
