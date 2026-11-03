"use client"

import { createReviewAction } from '@/ReviewAction/createReview'
import { updateReviewAction } from '@/ReviewAction/updateReview'
import { reviewSchema, reviewSchemaType } from '@/schema/reviewSchema'
import { Button } from '@/components/ui/button'
import {
    Field,
    FieldError,
} from "@/components/ui/field"
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
import { toast } from 'sonner'

const ReviewForm = ({ id, reviewId, review = "", rating = 5, closeEdit }: { id: string, reviewId?: string, review?: string, rating?: number, closeEdit?: () => void }) => {

    const { status } = useSession()

    const router = useRouter()

    const form = useForm<reviewSchemaType>({
        defaultValues: {
            review: review,
            rating: rating
        },
        resolver: zodResolver(reviewSchema)
    })


    async function sendReview(values: reviewSchemaType) {

        try {

            const data = reviewId ? await updateReviewAction(reviewId, values) : await createReviewAction(id, values)

            console.log(data)

            if (data.data) {
                toast.success(reviewId ? "Review updated" : "Review added", { position: "top-center" })
                form.reset({ review: "", rating: 5 })
                if (closeEdit) closeEdit()
                router.refresh()
            }

        } catch (error) {
            console.log(error)
            toast.error("You already reviewed this product", { position: "top-center" })
        }
    }

    if (status !== "authenticated") {
        return <p className='text-slate-600'>Please <Link href="/login" className='text-green-600 font-semibold'>login</Link> to write a review.</p>
    }

    return (
        <form onSubmit={form.handleSubmit(sendReview)}>

            <h3 className='font-semibold mb-3'>{reviewId ? "Edit your review" : "Write a review"}</h3>

            <Controller
                name="rating"
                control={form.control}
                render={({ field }) => (
                    <div className='flex gap-1 mb-3'>
                        {[1, 2, 3, 4, 5].map(function (star: number) {
                            return <button type='button' key={star} onClick={() => field.onChange(star)} className='text-2xl text-yellow-400 cursor-pointer'>
                                {star <= field.value ? <IoIosStar /> : <IoIosStarOutline />}
                            </button>
                        })}
                    </div>
                )}
            />

            <Controller
                name="review"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <textarea {...field} rows={4} placeholder='Share your experience...' aria-invalid={fieldState.invalid} className='w-full border border-slate-200 rounded-lg p-3 mb-3 outline-none focus:border-green-600' />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Button type='submit' disabled={form.formState.isSubmitting} className='w-full h-11 rounded-lg mt-2'>{reviewId ? "Update Review" : "Submit Review"}</Button>
        </form>
    )
}

export default ReviewForm
