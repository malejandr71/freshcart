"use client"
import { Button } from '@/components/ui/button'
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { forgotPasswordSchema, forgotPasswordSchemaType, resetCodeSchema, resetCodeSchemaType, resetPasswordSchema, resetPasswordSchemaType } from '@/schema/forgotPasswordSchema'

const ForgotPassword = () => {

    const router = useRouter()

    const [step, setStep] = useState(1)
    const [userEmail, setUserEmail] = useState("")


    const emailForm = useForm<forgotPasswordSchemaType>({
        defaultValues: {
            email: ""
        },
        resolver: zodResolver(forgotPasswordSchema)
    })

    const codeForm = useForm<resetCodeSchemaType>({
        defaultValues: {
            resetCode: ""
        },
        resolver: zodResolver(resetCodeSchema)
    })

    const passwordForm = useForm<resetPasswordSchemaType>({
        defaultValues: {
            newPassword: ""
        },
        resolver: zodResolver(resetPasswordSchema)
    })


    async function forgotPassword(values: forgotPasswordSchemaType) {

        try {

            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)

            console.log(data)
            toast.success(data.message, { position: "top-center" })
            setUserEmail(values.email)
            setStep(2)

        } catch (e) {
            toast.error(axios.isAxiosError(e) ? e.response?.data?.message : "something went wrong", { position: "top-center" })
        }
    }

    async function verifyResetCode(values: resetCodeSchemaType) {

        try {

            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)

            console.log(data)
            toast.success("Code verified", { position: "top-center" })
            setStep(3)

        } catch (e) {
            toast.error(axios.isAxiosError(e) ? e.response?.data?.message : "something went wrong", { position: "top-center" })
        }
    }

    async function resetPassword(values: resetPasswordSchemaType) {

        try {

            const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", { email: userEmail, newPassword: values.newPassword })

            console.log(data)
            toast.success("Password changed, login with the new password", { position: "top-center" })
            router.push("/login")

        } catch (e) {
            toast.error(axios.isAxiosError(e) ? e.response?.data?.message : "something went wrong", { position: "top-center" })
        }
    }

    return (
        <div className='my-12 p-5 w-full md:w-1/2 lg:w-[40%] mx-auto'>
            <div className='bg-white rounded-2xl shadow-lg border border-slate-100 p-8'>

                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold mb-2'><span className='text-green-600'>Fresh</span>Cart</h1>
                    <h2 className='text-2xl font-semibold mb-1'>{step === 1 ? "Forgot Password?" : step === 2 ? "Verify Reset Code" : "Reset Password"}</h2>
                    <p className='text-slate-500'>{step === 1 ? "Enter your email and we will send you a reset code" : step === 2 ? `Enter the code sent to ${userEmail}` : "Enter your new password"}</p>
                </div>

                <div className='flex justify-center gap-2 mb-8'>
                    {[1, 2, 3].map(function (num: number) {
                        return <span key={num} className={`h-2 rounded-full transition-all ${num <= step ? "bg-green-600 w-10" : "bg-slate-200 w-6"}`}></span>
                    })}
                </div>

                {step === 1 && <form onSubmit={emailForm.handleSubmit(forgotPassword)}>
                    <Controller
                        name="email"
                        control={emailForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                                <Input className="mb-5 h-11 rounded-lg" {...field} type='email' id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button disabled={emailForm.formState.isSubmitting} type='submit' className='w-full h-12 rounded-lg text-base'>Send Reset Code</Button>
                </form>}

                {step === 2 && <form onSubmit={codeForm.handleSubmit(verifyResetCode)}>
                    <Controller
                        name="resetCode"
                        control={codeForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Reset Code</FieldLabel>
                                <Input className="mb-5 h-11 rounded-lg tracking-widest" {...field} type='text' id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button disabled={codeForm.formState.isSubmitting} type='submit' className='w-full h-12 rounded-lg text-base'>Verify Code</Button>
                </form>}

                {step === 3 && <form onSubmit={passwordForm.handleSubmit(resetPassword)}>
                    <Controller
                        name="newPassword"
                        control={passwordForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                                <Input className="mb-5 h-11 rounded-lg" {...field} type='password' id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button disabled={passwordForm.formState.isSubmitting} type='submit' className='w-full h-12 rounded-lg text-base'>Reset Password</Button>
                </form>}

                <p className='text-center text-slate-500 mt-6'>Remember your password? <Link href="/login" className='text-green-600 font-semibold'>Sign In</Link></p>
            </div>
        </div>
    )
}

export default ForgotPassword
