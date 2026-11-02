"use client"

import { getProductReviews, getReviewById } from '@/apis/reviews'
import { createReviewAction } from '@/ReviewAction/createReview'
import { updateReviewAction } from '@/ReviewAction/updateReview'
import { deleteReviewAction } from '@/ReviewAction/deleteReview'
import { Review } from '@/types/review.t'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
import { toast } from 'sonner'

const Reviews = ({ id }: { id: string }) => {

    const { status, data: session } = useSession()

    const [reviews, setReviews] = useState<Review[]>([])
    const [rating, setRating] = useState(5)
    const [editId, setEditId] = useState("")
    const [showAll, setShowAll] = useState(false)

    const review = useRef<HTMLTextAreaElement>(null)

    async function getReviews() {
        try {
            const data = await getProductReviews(id)
            setReviews(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function sendReview() {
        const values = {
            review: review.current?.value || "",
            rating: rating
        }

        const data = editId ? await updateReviewAction(editId, values) : await createReviewAction(id, values)

        console.log(data);

        if (data?.data) {
            toast.success(editId ? "Review updated" : "Review added", { position: "top-center" })
            if (review.current) review.current.value = ""
            setEditId("")
            setRating(5)
            getReviews()
        } else {
            toast.error(data?.message || data?.errors?.msg || "something went wrong", { position: "top-center" })
        }
    }

    async function editReview(reviewId: string) {
        // Get Review By Id => fill the form with the old review
        const data: Review = await getReviewById(reviewId)
        if (review.current) review.current.value = data.review
        setRating(data.rating)
        setEditId(reviewId)
    }

    async function deleteReview(reviewId: string) {
        const data = await deleteReviewAction(reviewId)
        console.log(data);
        toast.success("Review deleted", { position: "top-center" })
        getReviews()
    }

    useEffect(function () {
        getReviews()
    }, [])

    // name of the logged user (from next-auth session)
    const userName = session?.user?.name

    return (
        <div className='mt-14'>

            <h2 className='text-2xl font-bold mb-6 border-s-4 border-green-600 ps-3'>Customer <span className='text-green-600'>Reviews</span> <span className='text-base text-slate-500 font-normal'>({reviews?.length})</span></h2>

            <div className='grid grid-cols-12 gap-8'>

                <div className='col-span-12 lg:col-span-5'>
                    <div className='bg-white border border-slate-200 rounded-2xl p-5'>
                        {status === "authenticated" ? <>
                            <h3 className='font-semibold mb-3'>{editId ? "Edit your review" : "Write a review"}</h3>
                            <div className='flex gap-1 mb-3'>
                                {[1, 2, 3, 4, 5].map(function (star: number) {
                                    return <button key={star} onClick={() => setRating(star)} className='text-2xl text-yellow-400 cursor-pointer'>
                                        {star <= rating ? <IoIosStar /> : <IoIosStarOutline />}
                                    </button>
                                })}
                            </div>
                            <textarea ref={review} rows={4} placeholder='Share your experience...' className='w-full border border-slate-200 rounded-lg p-3 mb-3 outline-none focus:border-green-600' />
                            <Button onClick={sendReview} className='w-full h-11 rounded-lg'>{editId ? "Update Review" : "Submit Review"}</Button>
                        </> : <p className='text-slate-600'>Please <Link href="/login" className='text-green-600 font-semibold'>login</Link> to write a review.</p>}
                    </div>
                </div>

                <div className='col-span-12 lg:col-span-7 space-y-4'>
                    {reviews?.length === 0 && <p className='text-slate-500'>No reviews yet.</p>}

                    {(showAll ? reviews : reviews?.slice(0, 5))?.map(function (item: Review, idx: number) {
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

                            {status === "authenticated" && item.user?.name === userName && <div className='flex gap-3 mt-3 text-sm'>
                                <button onClick={() => editReview(item._id)} className='text-green-600 cursor-pointer'>Edit</button>
                                <button onClick={() => deleteReview(item._id)} className='text-red-500 cursor-pointer'>Delete</button>
                            </div>}
                        </div>
                    })}

                    {reviews?.length > 5 && <button onClick={() => setShowAll(!showAll)} className='text-green-600 font-medium cursor-pointer'>{showAll ? "Show less" : `Show all ${reviews.length} reviews`}</button>}
                </div>
            </div>
        </div>
    )
}

export default Reviews
