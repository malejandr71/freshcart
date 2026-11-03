import React from 'react'
import { FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset } from 'react-icons/fa'

const Features = () => {

    const features = [
        { icon: <FaTruck />, title: "Free Shipping", desc: "On orders over 500 EGP", color: "bg-blue-50 text-blue-600" },
        { icon: <FaShieldAlt />, title: "Secure Payment", desc: "100% secure transactions", color: "bg-green-50 text-green-600" },
        { icon: <FaUndoAlt />, title: "Easy Returns", desc: "14-day return policy", color: "bg-orange-50 text-orange-500" },
        { icon: <FaHeadset />, title: "24/7 Support", desc: "Dedicated support team", color: "bg-purple-50 text-purple-600" },
    ]

    return (
        <div className='bg-slate-50 py-8'>
            <div className='w-full md:w-[90%] px-5 mx-auto grid grid-cols-12 gap-4'>
                {features.map(function (f, idx: number) {
                    return <div key={idx} className='col-span-12 sm:col-span-6 lg:col-span-3 bg-white rounded-xl shadow-sm p-4 flex items-center gap-4'>
                        <span className={`${f.color} rounded-full size-12 flex items-center justify-center text-lg`}>{f.icon}</span>
                        <div>
                            <h3 className='font-semibold'>{f.title}</h3>
                            <p className='text-sm text-slate-500'>{f.desc}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Features
