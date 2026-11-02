"use client"
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginSchema, LoginSchemaType } from '@/schema/loginSchema'
import { signIn } from 'next-auth/react'


const Login = () => {

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })


  async function signin(values: LoginSchemaType) {

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/"
    })

    console.log(res);

    if (res?.ok === true) {
      toast.success("login successfully",
        { position: "top-center" }
      )
      window.location.href = res?.url || "/"

    } else {
      toast.error(res?.error,
        { position: "top-center" }
      )
    }
  }

  return (
    <div className='w-full my-12 p-5 mx-auto md:w-[90%] flex gap-12 items-center'>

      <div className='hidden md:flex md:w-1/2 flex-col justify-center items-center text-center'>
        <div className='w-full h-80 rounded-2xl bg-cover bg-center shadow-lg mb-8' style={{ backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=70)" }}></div>
        <h2 className='text-3xl font-bold mb-3'>FreshCart - Your One-Stop Shop for Fresh Products</h2>
        <p className='text-slate-500'>Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
        <div className='flex gap-6 mt-5 text-sm text-slate-600'>
          <span>🚚 Free Delivery</span><span>🔒 Secure Payment</span><span>🕑 24/7 Support</span>
        </div>
      </div>

      <div className='w-full md:w-1/2 bg-white rounded-2xl shadow-lg border border-slate-100 p-8'>

        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-2'><span className='text-green-600'>Fresh</span>Cart</h1>
          <h2 className='text-2xl font-semibold mb-1'>Welcome Back!</h2>
          <p className='text-slate-500'>Sign in to continue your fresh shopping experience</p>
        </div>

      <form onSubmit={form.handleSubmit(signin)}>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Email</FieldLabel>
              <Input className="mb-5 h-11 rounded-lg" {...field} type='email' id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Password</FieldLabel>
              <Input className="mb-5 h-11 rounded-lg" {...field} type='password' id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type='submit' className='w-full h-12 text-base rounded-lg mt-2' >Login</Button>
      </form>

        <p className='text-center text-slate-500 mt-6'>New to FreshCart? <Link href="/register" className='text-green-600 font-semibold'>Create an account</Link></p>
      </div>
    </div>
  )
}

export default Login
