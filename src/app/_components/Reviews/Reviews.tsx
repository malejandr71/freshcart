import { getProductReviews } from '@/apis/reviews'
import { Review } from '@/types/review.t'
import React from 'react'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
import ReviewForm from '../ReviewForm/ReviewForm'
import ReviewActions from '../ReviewActions/ReviewActions'

const Reviews = async ({ id }: { id: string }) => {

    const reviews: Review[] = await getProductReviews(id)

    return (
        <div className='mt-14'>

            <h2 className='text-2xl font-bold mb-6 border-s-4 border-green-600 ps-3'>Customer <span className='text-green-600'>Reviews</span> <span className='text-base text-slate-500 font-normal'>({reviews?.length})</span></h2>

            <div className='grid grid-cols-12 gap-8'>

                <div className='col-span-12 lg:col-span-5'>
                    <div className='bg-white border border-slate-200 rounded-2xl p-5'>
                        <ReviewForm id={id} />
                    </div>
                </div>

                <div className='col-span-12 lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pe-2'>
                    {reviews?.length === 0 && <p className='text-slate-500'>No reviews yet.</p>}

                    {reviews?.map(function (item: Review, idx: number) {
                        return <div key={idx} className='bg-slate-50 rounded-2xl p-4'>
                            <div className='flex justify-between items-center mb-2'>
                                <h4 className='font-semibold'>{item.user?.name}</h4>
                                <span className='text-xs text-slate-500'>{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className='flex gap-0.5 text-yellow-400 mb-2'>
                                {[1, 2, 3, 4, 5].map(function (star: number) {
                                    return star <= item.rating ? <IoIosStar key={star} /> : <IoIosStarOutline key={star} />
                                })}
                            </div>
                            <p className='text-slate-700'>{item.review}</p>

                            <ReviewActions id={id} reviewId={item._id} userName={item.user?.name} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Reviews
