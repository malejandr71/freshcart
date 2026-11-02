
"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cartContext } from '@/Context/CartContext'
import { CahPaymentAction } from '@/PaymentAction/CashPayment'
import { OnlinePaymentAction } from '@/PaymentAction/OnlinePayment'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef } from 'react'
import { toast } from 'sonner'


const Payment = () => {

    const { cartId, afterPayment } = useContext(cartContext)

    const router = useRouter()

    const details = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)
    const city = useRef<HTMLInputElement>(null)


    async function cashPayment() {
        const value = {
            shippingAddress: {
                details: details.current?.value,
                phone: phone.current?.value,
                city: city.current?.value
            }
        }

        try {

            const data = await CahPaymentAction(cartId, value)

            if (data.status === "success") {
                toast.success("Order created successfully", { position: "top-center" })

                afterPayment()

                router.push("/allorders")
            }

            console.log(data);

        } catch (error) {
            console.log(error);

        }


    }


    async function onlinePayment() {
        const value = {
            shippingAddress: {
                details: details.current?.value,
                phone: phone.current?.value,
                city: city.current?.value
            }
        }




        try {

            const data = await OnlinePaymentAction(cartId, value)

            console.log(data);

            if (data.status === "success") {
                window.location.href = data.session.url
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='my-12 p-5 w-full md:w-1/2 mx-auto '>

            <h1 className='text-3xl  text-center mb-5'>Payment </h1>

            <Label htmlFor='details'>Details</Label>

            <Input ref={details} type="text" id='details' className='mb-4' />

            <Label htmlFor='phone'>Phone</Label>

            <Input ref={phone} type="tel" id='phone' className='mb-4' />

            <Label htmlFor='city'>City</Label>

            <Input ref={city} type="text" id='city' className='mb-4' />

            <Button onClick={cashPayment} className='me-3'>Cash Payment</Button>
            <Button onClick={onlinePayment}>Online Payment</Button>


        </div>
    )
}

export default Payment
