import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from "@/assets/freshcart-logo.svg"
import { FaTruck, FaUndoAlt, FaShieldAlt, FaHeadset, FaPhoneAlt, FaRegEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

// Footer design taken from the FreshCart Figma file
const Footer = () => {

    const features = [
        { icon: <FaTruck />, title: "Free Shipping", desc: "On orders over 500 EGP" },
        { icon: <FaUndoAlt />, title: "Easy Returns", desc: "14-day return policy" },
        { icon: <FaShieldAlt />, title: "Secure Payment", desc: "100% secure checkout" },
        { icon: <FaHeadset />, title: "24/7 Support", desc: "Contact us anytime" },
    ]

    const links = [
        { title: "Shop", items: [{ name: "All Products", href: "/" }, { name: "Categories", href: "/categories" }, { name: "Brands", href: "/brands" }] },
        { title: "Account", items: [{ name: "My Cart", href: "/cart" }, { name: "Order History", href: "/allorders" }, { name: "Sign In", href: "/login" }, { name: "Create Account", href: "/register" }] },
        { title: "Support", items: [{ name: "Contact Us", href: "/" }, { name: "Help Center", href: "/" }, { name: "Shipping Info", href: "/" }, { name: "Returns & Refunds", href: "/" }] },
        { title: "Legal", items: [{ name: "Privacy Policy", href: "/" }, { name: "Terms of Service", href: "/" }, { name: "Cookie Policy", href: "/" }] },
    ]

    return (
        <footer className='mt-16'>

            <div className='bg-green-50 py-8'>
                <div className='w-full md:w-[90%] px-5 mx-auto grid grid-cols-12 gap-5'>
                    {features.map(function (f, idx: number) {
                        return <div key={idx} className='col-span-12 sm:col-span-6 lg:col-span-3 flex items-center gap-3'>
                            <span className='bg-green-600 text-white rounded-full size-12 flex items-center justify-center text-lg'>{f.icon}</span>
                            <div>
                                <h3 className='font-semibold'>{f.title}</h3>
                                <p className='text-sm text-slate-500'>{f.desc}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div className='bg-slate-900 text-slate-300 py-12'>
                <div className='w-full md:w-[90%] px-5 mx-auto grid grid-cols-12 gap-8'>

                    <div className='col-span-12 lg:col-span-4'>
                        <div className='bg-white rounded-lg inline-block px-4 py-2 mb-5'>
                            <Image src={logo} alt="FreshCart" className='h-8 w-auto' />
                        </div>
                        <p className='text-sm leading-6 mb-5'>FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.</p>
                        <p className='flex items-center gap-2 text-sm mb-2'><FaPhoneAlt className='text-green-500' /> +1 (800) 123-4567</p>
                        <p className='flex items-center gap-2 text-sm mb-2'><FaRegEnvelope className='text-green-500' /> support@freshcart.com</p>
                        <p className='flex items-center gap-2 text-sm mb-5'><FaMapMarkerAlt className='text-green-500' /> 123 Commerce Street, New York, NY 10001</p>
                        <div className='flex gap-3'>
                            {[<FaFacebookF key={1} />, <FaTwitter key={2} />, <FaInstagram key={3} />, <FaYoutube key={4} />].map(function (icon, idx: number) {
                                return <span key={idx} className='bg-slate-800 hover:bg-green-600 transition rounded-full size-9 flex items-center justify-center'>{icon}</span>
                            })}
                        </div>
                    </div>

                    {links.map(function (col, idx: number) {
                        return <div key={idx} className='col-span-6 md:col-span-3 lg:col-span-2'>
                            <h3 className='text-white font-semibold mb-4'>{col.title}</h3>
                            <ul className='space-y-3 text-sm'>
                                {col.items.map(function (item, i: number) {
                                    return <li key={i}><Link href={item.href} className='hover:text-green-500'>{item.name}</Link></li>
                                })}
                            </ul>
                        </div>
                    })}
                </div>

                <div className='w-full md:w-[90%] px-5 mx-auto border-t border-slate-800 mt-10 pt-6 flex flex-wrap justify-between gap-3 text-sm'>
                    <p>© 2026 FreshCart. All rights reserved.</p>
                    <div className='flex gap-4'>
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>PayPal</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
