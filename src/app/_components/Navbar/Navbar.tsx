"use client"
import React, { useContext } from 'react'
import logo from "@/assets/freshcart-logo.svg"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { cartContext } from '@/Context/CartContext'

const Navbar = () => {

    const { status } = useSession()

    const { totalCartItem } = useContext(cartContext)

    return (
        <div className="py-5 bg-slate-100 ">

            <div className='w-full md:w-[80%] px-5 mx-auto'>

                <div className='parent flex  text-center flex-wrap justify-between items-center'>


                    <div className='logo w-full  md:w-1/4'>

                        <Image src={logo} alt="" />

                    </div>

                    {status === "authenticated" && <ul className='md:flex     justify-around   w-full  md:w-1/2 items-center'>
                        <li>
                            <Link href="/">Products</Link>
                        </li>
                        <li>
                            <Link href="/brands">Brands </Link>
                        </li>

                        <li>
                            <Link href="/categories">Categories</Link>
                        </li>

                        <li>
                            <Link href="/allorders">allorders</Link>
                        </li>

                        <li>
                            <Link href="/cart">Cart <span className='bg-black text-white rounded-full px-2 py-0.5 text-xs'>{totalCartItem}</span></Link>
                        </li>
                    </ul>}

                    {status === "loading" && <h1>Loading ......</h1>}



                    <ul className='md:flex justify-end  items-center w-full md:w-1/4  ' >

                        {status === "authenticated" && <li className='me-5'>
                            <Button onClick={() => signOut({
                                callbackUrl: "/login"
                            })}>logout</Button>
                        </li>}

                        {status === "unauthenticated" && <>

                            <li className='me-5'>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/register">Register </Link>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
