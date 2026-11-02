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
    <div className='w-full my-12 p-5 mx-auto md:w-[60%] '>

      <form onSubmit={form.handleSubmit(signin)}>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Email</FieldLabel>
              <Input className="mb-5" {...field} type='email' id={field.name} aria-invalid={fieldState.invalid} />
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
              <Input className="mb-5" {...field} type='password' id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type='submit' >Login</Button>
      </form>
    </div>
  )
}

export default Login
