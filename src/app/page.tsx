import React from 'react'
import { getAllProduct } from '@/apis/products'
import { Product } from '@/types/product.t'
import HomeCard from './_components/HomeCard/HomeCard'
import MainSlider from './_components/MainSlider/MainSlider'
import Categories from './_components/Categories/Categories'
import Features from './_components/Features/Features'
import { getAllReviews } from '@/apis/reviews'
import { Review } from '@/types/review.t'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

const Products = async () => {

    const data: Product[] = await getAllProduct()

    console.log(data);

    const reviews: Review[] = await getAllReviews(4)

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

            <div className='p-5 w-full md:w-[90%] mx-auto'>
                <h2 className='text-3xl font-bold mb-8 border-s-4 border-green-600 ps-3'>Customer <span className='text-green-600'>Reviews</span></h2>
                <div className='grid grid-cols-12 gap-5'>
                    {reviews?.map(function (review: Review, idx: number) {
                        return <div key={idx} className='col-span-12 sm:col-span-6 lg:col-span-3 bg-slate-50 rounded-2xl p-5'>
                            <div className='flex gap-0.5 text-yellow-400 mb-3'>
                                {[1, 2, 3, 4, 5].map(function (star: number) {
                                    return star <= review.rating ? <IoIosStar key={star} /> : <IoIosStarOutline key={star} />
                                })}
                            </div>
                            <p className='text-slate-700 mb-3 line-clamp-3'>{review.review}</p>
                            <h3 className='font-semibold text-sm'>{review.user?.name}</h3>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Products
