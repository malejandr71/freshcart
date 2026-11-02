"use client"
import React, { useContext } from 'react'
import logo from "@/assets/freshcart-logo.svg"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { cartContext } from '@/Context/CartContext'
import { FaTruck, FaGift, FaPhoneAlt, FaRegEnvelope, FaRegUser, FaUserPlus, FaSearch, FaHeadset, FaRegHeart, FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {

    const { status } = useSession()

    const { totalCartItem } = useContext(cartContext)

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm">

            {/* top bar (Figma) */}
            <div className='hidden md:block border-b border-slate-100 text-sm text-slate-600'>
                <div className='w-full md:w-[90%] px-5 mx-auto flex justify-between items-center py-2'>
                    <div className='flex gap-6'>
                        <span className='flex items-center gap-2'><FaTruck className='text-green-600' /> Free Shipping on Orders 500 EGP</span>
                        <span className='flex items-center gap-2'><FaGift className='text-green-600' /> New Arrivals Daily</span>
                    </div>
                    <div className='flex gap-6 items-center'>
                        <span className='flex items-center gap-2'><FaPhoneAlt className='text-xs' /> +1 (800) 123-4567</span>
                        <span className='flex items-center gap-2'><FaRegEnvelope /> support@freshcart.com</span>

                        {status === "unauthenticated" && <>
                            <Link href="/login" className='flex items-center gap-1 hover:text-green-600'><FaRegUser /> Sign In</Link>
                            <Link href="/register" className='flex items-center gap-1 hover:text-green-600'><FaUserPlus /> Sign Up</Link>
                        </>}
                    </div>
                </div>
            </div>

            <div className="py-3">

                <div className='w-full md:w-[90%] px-5 mx-auto'>

                    <div className='parent flex flex-wrap gap-4 justify-between items-center'>


                        <div className='logo'>
                            <Link href="/">
                                <Image src={logo} alt="FreshCart" className='h-9 w-auto' />
                            </Link>
                        </div>

                        <div className='hidden lg:flex flex-1 max-w-md items-center border border-slate-200 rounded-full ps-5 pe-1 py-1'>
                            <input type="text" placeholder='Search for products, brands and more...' className='flex-1 outline-none text-sm bg-transparent' />
                            <span className='bg-green-600 text-white rounded-full size-9 flex items-center justify-center'><FaSearch /></span>
                        </div>

                        {status === "authenticated" && <ul className='flex flex-wrap gap-6 items-center text-slate-700 font-medium'>
                            <li>
                                <Link href="/" className='hover:text-green-600'>Products</Link>
                            </li>
                            <li>
                                <Link href="/brands" className='hover:text-green-600'>Brands </Link>
                            </li>

                            <li>
                                <Link href="/categories" className='hover:text-green-600'>Categories</Link>
                            </li>

                            <li>
                                <Link href="/allorders" className='hover:text-green-600'>allorders</Link>
                            </li>
                        </ul>}

                        {status === "loading" && <h1 className='text-slate-500'>Loading ......</h1>}



                        <ul className='flex gap-5 items-center' >

                            <li className='hidden xl:flex items-center gap-2 border-e border-slate-200 pe-5'>
                                <span className='bg-green-50 text-green-600 rounded-full size-10 flex items-center justify-center'><FaHeadset /></span>
                                <span className='text-xs leading-4 text-slate-500'>Support<br /><b className='text-slate-800 text-sm'>24/7 Help</b></span>
                            </li>

                            {status === "authenticated" && <>
                                <li>
                                    <FaRegHeart className='text-xl text-slate-600' />
                                </li>
                                <li>
                                    <Link href="/cart" className='relative block text-slate-600 hover:text-green-600'>
                                        <FaShoppingCart className='text-2xl' />
                                        <span className='absolute -top-2 -end-3 bg-green-600 text-white rounded-full size-5 flex items-center justify-center text-xs'>{totalCartItem}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Button className='rounded-full px-5 h-10' onClick={() => signOut({
                                        callbackUrl: "/login"
                                    })}>logout</Button>
                                </li>
                            </>}

                            {status === "unauthenticated" && <>

                                <li>
                                    <Link href="/login">
                                        <Button className='rounded-full px-5 h-10'><FaRegUser /> Sign In</Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" className='font-medium hover:text-green-600'>Register </Link>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
