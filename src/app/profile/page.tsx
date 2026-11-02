"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { verifyTokenAction } from '@/UserAction/verifyToken'
import { updateMeAction } from '@/UserAction/updateMe'
import { changePasswordAction } from '@/UserAction/changePassword'
import { addAddressAction } from '@/AddressAction/addAddress'
import { getAddressesAction } from '@/AddressAction/getAddresses'
import { removeAddressAction } from '@/AddressAction/removeAddress'
import { getSpecificAddressAction } from '@/AddressAction/getSpecificAddress'
import { Address } from '@/types/address.t'
import { signOut } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { FaMapMarkerAlt, FaTrash, FaRegUser } from 'react-icons/fa'
import Loading from '../loading'

const Profile = () => {

    const [user, setUser] = useState<{ id: string, name: string, role: string } | null>(null)
    const [addresses, setAddresses] = useState<Address[]>([])
    const [selected, setSelected] = useState<Address | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // update data
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)

    // change password
    const currentPassword = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const rePassword = useRef<HTMLInputElement>(null)

    // address
    const addressName = useRef<HTMLInputElement>(null)
    const details = useRef<HTMLInputElement>(null)
    const addressPhone = useRef<HTMLInputElement>(null)
    const city = useRef<HTMLInputElement>(null)


    async function getProfile() {
        setIsLoading(true)
        try {
            const data = await verifyTokenAction()
            setUser(data.decoded)

            const addressesData = await getAddressesAction()
            setAddresses(addressesData.data)

            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    async function updateMe() {
        const values = {
            name: name.current?.value || "",
            email: email.current?.value || "",
            phone: phone.current?.value || ""
        }
        const data = await updateMeAction(values)
        console.log(data);
        if (data?.message === "success") {
            toast.success("Data updated, login again", { position: "top-center" })
            signOut({ callbackUrl: "/login" })
        } else {
            toast.error(data?.errors?.msg || data?.message, { position: "top-center" })
        }
    }

    async function changePassword() {
        const values = {
            currentPassword: currentPassword.current?.value || "",
            password: password.current?.value || "",
            rePassword: rePassword.current?.value || ""
        }
        const data = await changePasswordAction(values)
        console.log(data);
        if (data?.message === "success") {
            toast.success("Password changed, login again", { position: "top-center" })
            signOut({ callbackUrl: "/login" })
        } else {
            toast.error(data?.errors?.msg || data?.message, { position: "top-center" })
        }
    }

    async function addAddress() {
        const values = {
            name: addressName.current?.value || "",
            details: details.current?.value || "",
            phone: addressPhone.current?.value || "",
            city: city.current?.value || ""
        }
        const data = await addAddressAction(values)
        console.log(data);
        if (data?.status === "success") {
            toast.success(data.message, { position: "top-center" })
            setAddresses(data.data)
            for (const input of [addressName, details, addressPhone, city]) {
                if (input.current) input.current.value = ""
            }
        } else {
            toast.error(data?.errors?.msg || data?.message, { position: "top-center" })
        }
    }

    async function removeAddress(id: string) {
        try {
            const data = await removeAddressAction(id)
            toast.success(data.message, { position: "top-center" })
            setAddresses(data.data)
            setSelected(null)
        } catch (error) {
            console.log(error);
        }
    }

    async function showAddress(id: string) {
        try {
            const data = await getSpecificAddressAction(id)
            setSelected(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        getProfile()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='my-12 w-full md:w-[90%] mx-auto p-5'>

            <div className='bg-gradient-to-r from-green-600 to-green-400 text-white rounded-2xl p-8 mb-8 flex items-center gap-5'>
                <span className='bg-white/20 rounded-full size-16 flex items-center justify-center text-2xl'><FaRegUser /></span>
                <div>
                    <h1 className='text-3xl font-bold'>{user?.name}</h1>
                    <p className='text-white/80'>Role : {user?.role}</p>
                </div>
            </div>

            <div className='grid grid-cols-12 gap-6'>

                <div className='col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6'>
                    <h2 className='text-xl font-bold mb-5'>Update Your Data</h2>
                    <Label htmlFor='name' className='mb-2'>Name</Label>
                    <Input ref={name} id='name' defaultValue={user?.name} className='mb-4 h-11 rounded-lg' />
                    <Label htmlFor='email' className='mb-2'>Email</Label>
                    <Input ref={email} id='email' type='email' className='mb-4 h-11 rounded-lg' />
                    <Label htmlFor='phone' className='mb-2'>Phone</Label>
                    <Input ref={phone} id='phone' type='tel' className='mb-5 h-11 rounded-lg' />
                    <Button onClick={updateMe} className='w-full h-11 rounded-lg'>Update Data</Button>
                </div>

                <div className='col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6'>
                    <h2 className='text-xl font-bold mb-5'>Change Password</h2>
                    <Label htmlFor='currentPassword' className='mb-2'>Current Password</Label>
                    <Input ref={currentPassword} id='currentPassword' type='password' className='mb-4 h-11 rounded-lg' />
                    <Label htmlFor='password' className='mb-2'>New Password</Label>
                    <Input ref={password} id='password' type='password' className='mb-4 h-11 rounded-lg' />
                    <Label htmlFor='rePassword' className='mb-2'>Confirm New Password</Label>
                    <Input ref={rePassword} id='rePassword' type='password' className='mb-5 h-11 rounded-lg' />
                    <Button onClick={changePassword} className='w-full h-11 rounded-lg'>Change Password</Button>
                </div>

                <div className='col-span-12 bg-white border border-slate-200 rounded-2xl p-6'>
                    <h2 className='text-xl font-bold mb-5'>My Addresses</h2>

                    <div className='grid grid-cols-12 gap-6'>
                        <div className='col-span-12 lg:col-span-5'>
                            <Label htmlFor='addressName' className='mb-2'>Address Name</Label>
                            <Input ref={addressName} id='addressName' placeholder='Home' className='mb-4 h-11 rounded-lg' />
                            <Label htmlFor='details' className='mb-2'>Details</Label>
                            <Input ref={details} id='details' className='mb-4 h-11 rounded-lg' />
                            <Label htmlFor='addressPhone' className='mb-2'>Phone</Label>
                            <Input ref={addressPhone} id='addressPhone' type='tel' className='mb-4 h-11 rounded-lg' />
                            <Label htmlFor='city' className='mb-2'>City</Label>
                            <Input ref={city} id='city' className='mb-5 h-11 rounded-lg' />
                            <Button onClick={addAddress} className='w-full h-11 rounded-lg'>Add Address</Button>
                        </div>

                        <div className='col-span-12 lg:col-span-7 space-y-3'>
                            {addresses?.length === 0 && <p className='text-slate-500'>No addresses yet.</p>}

                            {addresses?.map(function (address: Address, idx: number) {
                                return <div key={idx} className={`flex justify-between items-center rounded-xl p-4 border ${selected?._id === address._id ? "border-green-600 bg-green-50" : "border-slate-200 bg-slate-50"}`}>
                                    <button onClick={() => showAddress(address._id)} className='flex items-center gap-3 text-start cursor-pointer'>
                                        <FaMapMarkerAlt className='text-green-600' />
                                        <span>
                                            <b>{address.name}</b>
                                            <span className='block text-sm text-slate-500'>{address.city}</span>
                                        </span>
                                    </button>
                                    <button onClick={() => removeAddress(address._id)} aria-label='Remove address' className='text-red-500 cursor-pointer'><FaTrash /></button>
                                </div>
                            })}

                            {selected && <div className='rounded-xl p-4 bg-white border border-green-600'>
                                <h3 className='font-semibold mb-2'>{selected.name}</h3>
                                <p className='text-sm text-slate-600'>Details : {selected.details}</p>
                                <p className='text-sm text-slate-600'>Phone : {selected.phone}</p>
                                <p className='text-sm text-slate-600'>City : {selected.city}</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
