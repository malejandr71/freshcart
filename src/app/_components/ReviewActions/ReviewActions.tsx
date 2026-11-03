"use client"

import { getReviewById } from '@/apis/reviews'
import { deleteReviewAction } from '@/ReviewAction/deleteReview'
import { Review } from '@/types/review.t'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import ReviewForm from '../ReviewForm/ReviewForm'

const ReviewActions = ({ id, reviewId, userName }: { id: string, reviewId: string, userName: string }) => {

    const { status, data: session } = useSession()

    const router = useRouter()

    const [editReview, setEditReview] = useState<Review | null>(null)


    async function getReview() {
        try {
            const data: Review = await getReviewById(reviewId)
            setEditReview(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteReview() {
        try {
            const data = await deleteReviewAction(reviewId)
            console.log(data)
            toast.success("Review deleted", { position: "top-center" })
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error("can't delete this review", { position: "top-center" })
        }
    }

    if (status !== "authenticated" || session?.user?.name !== userName) {
        return null
    }

    return (
        <>
            <div className='flex gap-3 mt-3 text-sm'>
                <button onClick={getReview} className='text-green-600 cursor-pointer'>Edit</button>
                <button onClick={deleteReview} className='text-red-500 cursor-pointer'>Delete</button>
            </div>

            {editReview && <div className='bg-white border border-slate-200 rounded-2xl p-4 mt-3'>
                <ReviewForm id={id} reviewId={reviewId} review={editReview.review} rating={editReview.rating} closeEdit={() => setEditReview(null)} />
            </div>}
        </>
    )
}

export default ReviewActions
