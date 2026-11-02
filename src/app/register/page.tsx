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
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { registerSchema, registerSchemaType } from '@/schema/registerSchema'

/*
  form => shad cn ui
  RHF =>  react hook form
  zod => validation
*/

const Register = () => {

  const route = useRouter()

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(registerSchema)
  })


  async function signup(values: registerSchemaType) {

    try {

      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)

      console.log(data)
      toast.success(data.message, { position: "top-center" })
      route.push("/login")

    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((e as any)?.response?.data?.message, { position: "top-center" })
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
          <h2 className='text-2xl font-semibold mb-1'>Create Your Account</h2>
          <p className='text-slate-500'>Start your fresh journey with us today</p>
        </div>

      <form onSubmit={form.handleSubmit(signup)}>

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Name</FieldLabel>
              <Input className="mb-5 h-11 rounded-lg" {...field} type='text' id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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

        <Controller
          name="rePassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your rePassword</FieldLabel>
              <Input className="mb-5 h-11 rounded-lg" {...field} type='password' id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Phone</FieldLabel>
              <Input className="mb-5 h-11 rounded-lg" {...field} type='tel' id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type='submit' className='w-full h-12 text-base rounded-lg mt-2' >Register </Button>
      </form>

        <p className='text-center text-slate-500 mt-6'>Already have an account? <Link href="/login" className='text-green-600 font-semibold'>Sign In</Link></p>
      </div>
    </div>
  )
}

export default Register
