"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'

// Forgot Password => Verify Reset Code => Reset Password
const ForgotPassword = () => {

    const router = useRouter()

    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const email = useRef<HTMLInputElement>(null)
    const resetCode = useRef<HTMLInputElement>(null)
    const newPassword = useRef<HTMLInputElement>(null)

    const [userEmail, setUserEmail] = useState("")


    async function forgotPassword() {
        setIsLoading(true)
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email: email.current?.value })
            console.log(data);
            toast.success(data.message, { position: "top-center" })
            setUserEmail(email.current?.value || "")
            setStep(2)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toast.error((e as any)?.response?.data?.message, { position: "top-center" })
        }
        setIsLoading(false)
    }

    async function verifyResetCode() {
        setIsLoading(true)
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode: resetCode.current?.value })
            console.log(data);
            toast.success("Code verified", { position: "top-center" })
            setStep(3)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toast.error((e as any)?.response?.data?.message, { position: "top-center" })
        }
        setIsLoading(false)
    }

    async function resetPassword() {
        setIsLoading(true)
        try {
            const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", { email: userEmail, newPassword: newPassword.current?.value })
            console.log(data);
            toast.success("Password changed, login with the new password", { position: "top-center" })
            router.push("/login")
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toast.error((e as any)?.response?.data?.message, { position: "top-center" })
        }
        setIsLoading(false)
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

                {step === 1 && <>
                    <Label htmlFor='email' className='mb-2'>Email Address</Label>
                    <Input ref={email} type="email" id='email' className='mb-5 h-11 rounded-lg' />
                    <Button disabled={isLoading} onClick={forgotPassword} className='w-full h-12 rounded-lg text-base'>Send Reset Code</Button>
                </>}

                {step === 2 && <>
                    <Label htmlFor='resetCode' className='mb-2'>Reset Code</Label>
                    <Input ref={resetCode} type="text" id='resetCode' className='mb-5 h-11 rounded-lg tracking-widest' />
                    <Button disabled={isLoading} onClick={verifyResetCode} className='w-full h-12 rounded-lg text-base'>Verify Code</Button>
                </>}

                {step === 3 && <>
                    <Label htmlFor='newPassword' className='mb-2'>New Password</Label>
                    <Input ref={newPassword} type="password" id='newPassword' className='mb-5 h-11 rounded-lg' />
                    <Button disabled={isLoading} onClick={resetPassword} className='w-full h-12 rounded-lg text-base'>Reset Password</Button>
                </>}

                <p className='text-center text-slate-500 mt-6'>Remember your password? <Link href="/login" className='text-green-600 font-semibold'>Sign In</Link></p>
            </div>
        </div>
    )
}

export default ForgotPassword
