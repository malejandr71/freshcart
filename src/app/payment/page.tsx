
"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cartContext } from '@/Context/CartContext'
import { CahPaymentAction } from '@/PaymentAction/CashPayment'
import { onlinePaymentAction } from '@/PaymentAction/OnlinePayment'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { getAddressesAction } from '@/AddressAction/getAddresses'
import { getSpecificAddressAction } from '@/AddressAction/getSpecificAddress'
import { Address } from '@/types/address.t'


const Payment = () => {

    const { CartId, afterPayment } = useContext(cartContext)

    const router = useRouter()

    const details = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)
    const city = useRef<HTMLInputElement>(null)


    const [addresses, setAddresses] = useState<Address[]>([])

    async function getAddresses() {
        try {
            const data = await getAddressesAction()
            setAddresses(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function chooseAddress(id: string) {
        try {
            const data = await getSpecificAddressAction(id)
            if (details.current) details.current.value = data.data.details
            if (phone.current) phone.current.value = data.data.phone
            if (city.current) city.current.value = data.data.city
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        getAddresses()
    }, [])


    async function cashPayment() {
        const value = {
            shippingAddress: {
                details: details.current?.value,
                phone: phone.current?.value,
                city: city.current?.value
            }
        }

        try {

            const data = await CahPaymentAction(CartId, value)

            console.log(data);

            afterPayment()
            router.push("/allorders")

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

            const data = await onlinePaymentAction(CartId, value)

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

            <div className='bg-white rounded-2xl shadow-lg border border-slate-100 p-8'>

                <h1 className='text-3xl font-bold text-center mb-2'>Payment </h1>
                <p className='text-center text-slate-500 mb-8'>Complete your order by adding the shipping address</p>

                {addresses?.length > 0 && <div className='mb-6'>
                    <p className='text-sm font-medium mb-2'>Saved Addresses</p>
                    <div className='flex flex-wrap gap-2'>
                        {addresses.map(function (address: Address, idx: number) {
                            return <button key={idx} onClick={() => chooseAddress(address._id)} className='px-4 py-2 rounded-full border border-slate-200 hover:border-green-600 hover:text-green-600 text-sm cursor-pointer'>{address.name} - {address.city}</button>
                        })}
                    </div>
                </div>}

                <Label htmlFor='details' className='mb-2'>Details</Label>

                <Input ref={details} type="text" id='details' className='mb-4 h-11 rounded-lg' placeholder='Street, building, floor...' />

                <Label htmlFor='phone' className='mb-2'>Phone</Label>

                <Input ref={phone} type="tel" id='phone' className='mb-4 h-11 rounded-lg' placeholder='01xxxxxxxxx' />

                <Label htmlFor='city' className='mb-2'>City</Label>

                <Input ref={city} type="text" id='city' className='mb-6 h-11 rounded-lg' placeholder='Cairo' />

                <div className='flex flex-wrap gap-3'>
                    <Button onClick={cashPayment} className='me-3 flex-1 h-12 rounded-lg text-base'>Cash Payment</Button>
                    <Button onClick={onlinePayment} variant="outline" className='flex-1 h-12 rounded-lg text-base border-green-600 text-green-600 hover:bg-green-50'>Online Payment</Button>
                </div>
            </div>


        </div>
    )
}

export default Payment
