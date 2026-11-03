"use client"
import { Button } from '@/components/ui/button'
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyTokenAction } from '@/UserAction/verifyToken'
import { updateMeAction } from '@/UserAction/updateMe'
import { changePasswordAction } from '@/UserAction/changePassword'
import { addAddressAction } from '@/AddressAction/addAddress'
import { getAddressesAction } from '@/AddressAction/getAddresses'
import { removeAddressAction } from '@/AddressAction/removeAddress'
import { getSpecificAddressAction } from '@/AddressAction/getSpecificAddress'
import { updateMeSchema, updateMeSchemaType } from '@/schema/updateMeSchema'
import { changePasswordSchema, changePasswordSchemaType } from '@/schema/changePasswordSchema'
import { addressSchema, addressSchemaType } from '@/schema/addressSchema'
import { Address } from '@/types/address.t'
import { signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FaMapMarkerAlt, FaTrash, FaRegUser } from 'react-icons/fa'
import Loading from '../loading'

const Profile = () => {

    const [user, setUser] = useState<{ id: string, name: string, role: string } | null>(null)
    const [addresses, setAddresses] = useState<Address[]>([])
    const [selected, setSelected] = useState<Address | null>(null)
    const [isLoading, setIsLoading] = useState(false)


    const updateMeForm = useForm<updateMeSchemaType>({
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
        resolver: zodResolver(updateMeSchema)
    })

    const changePasswordForm = useForm<changePasswordSchemaType>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(changePasswordSchema)
    })

    const addressForm = useForm<addressSchemaType>({
        defaultValues: {
            name: "",
            details: "",
            phone: "",
            city: ""
        },
        resolver: zodResolver(addressSchema)
    })


    async function getProfile() {
        setIsLoading(true)
        try {
            const data = await verifyTokenAction()
            setUser(data.decoded)
            updateMeForm.setValue("name", data.decoded.name)

            const addressesData = await getAddressesAction()
            setAddresses(addressesData.data)

            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    async function updateMe(values: updateMeSchemaType) {
        try {
            const data = await updateMeAction(values)
            console.log(data);
            if (data.message === "success") {
                toast.success("Data updated, login again", { position: "top-center" })
                signOut({ callbackUrl: "/login" })
            }
        } catch (error) {
            console.log(error);
            toast.error("E-mail already in use or invalid data", { position: "top-center" })
        }
    }

    async function changePassword(values: changePasswordSchemaType) {
        try {
            const data = await changePasswordAction(values)
            console.log(data);
            if (data.message === "success") {
                toast.success("Password changed, login again", { position: "top-center" })
                signOut({ callbackUrl: "/login" })
            }
        } catch (error) {
            console.log(error);
            toast.error("Current password is incorrect", { position: "top-center" })
        }
    }

    async function addAddress(values: addressSchemaType) {
        try {
            const data = await addAddressAction(values)
            console.log(data);
            if (data.status === "success") {
                toast.success(data.message, { position: "top-center" })
                setAddresses(data.data)
                addressForm.reset()
            }
        } catch (error) {
            console.log(error);
            toast.error("can't add this address", { position: "top-center" })
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
<form onSubmit={updateMeForm.handleSubmit(updateMe)}>
                    <Controller
                        name="name"
                        control={updateMeForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"updateMeForm-" + field.name}>Name</FieldLabel>
                                <Input className="mb-4 h-11 rounded-lg" {...field} type='text' id={"updateMeForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="email"
                        control={updateMeForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"updateMeForm-" + field.name}>Email</FieldLabel>
                                <Input className="mb-4 h-11 rounded-lg" {...field} type='email' id={"updateMeForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={updateMeForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"updateMeForm-" + field.name}>Phone</FieldLabel>
                                <Input className="mb-5 h-11 rounded-lg" {...field} type='tel' id={"updateMeForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button type='submit' className='w-full h-11 rounded-lg'>Update Data</Button>
                    </form>
                </div>

                <div className='col-span-12 lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6'>
                    <h2 className='text-xl font-bold mb-5'>Change Password</h2>
<form onSubmit={changePasswordForm.handleSubmit(changePassword)}>
                    <Controller
                        name="currentPassword"
                        control={changePasswordForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"changePasswordForm-" + field.name}>Current Password</FieldLabel>
                                <Input className="mb-4 h-11 rounded-lg" {...field} type='password' id={"changePasswordForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={changePasswordForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"changePasswordForm-" + field.name}>New Password</FieldLabel>
                                <Input className="mb-4 h-11 rounded-lg" {...field} type='password' id={"changePasswordForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="rePassword"
                        control={changePasswordForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"changePasswordForm-" + field.name}>Confirm New Password</FieldLabel>
                                <Input className="mb-5 h-11 rounded-lg" {...field} type='password' id={"changePasswordForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button type='submit' className='w-full h-11 rounded-lg'>Change Password</Button>
                    </form>
                </div>

                <div className='col-span-12 bg-white border border-slate-200 rounded-2xl p-6'>
                    <h2 className='text-xl font-bold mb-5'>My Addresses</h2>

                    <div className='grid grid-cols-12 gap-6'>
                        <div className='col-span-12 lg:col-span-5'>
<form onSubmit={addressForm.handleSubmit(addAddress)}>
                    <Controller
                        name="name"
                        control={addressForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"addressForm-" + field.name}>Address Name</FieldLabel>
                                <Input className="mb-4 h-11 rounded-lg" {...field} type='text' id={"addressForm-" + field.name} placeholder='Home' aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="details"
                        control={addressForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"addressForm-" + field.name}>Details</FieldLabel>
                                <Input className="mb-4 h-11 rounded-lg" {...field} type='text' id={"addressForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={addressForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"addressForm-" + field.name}>Phone</FieldLabel>
                                <Input className="mb-4 h-11 rounded-lg" {...field} type='tel' id={"addressForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="city"
                        control={addressForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={"addressForm-" + field.name}>City</FieldLabel>
                                <Input className="mb-5 h-11 rounded-lg" {...field} type='text' id={"addressForm-" + field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button type='submit' className='w-full h-11 rounded-lg'>Add Address</Button>
                    </form>
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
