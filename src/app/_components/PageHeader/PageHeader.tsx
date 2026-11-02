import Link from 'next/link'
import React from 'react'

// gradient header used in Figma (Brands = purple, Categories = green)
const PageHeader = ({ title, desc, crumb, color = "green" }: { title: string, desc?: string, crumb: string, color?: "green" | "purple" }) => {
    return (
        <div className={`${color === "purple" ? "bg-gradient-to-r from-violet-600 to-purple-400" : "bg-gradient-to-r from-green-600 to-green-400"} text-white py-12`}>
            <div className='w-full md:w-[90%] mx-auto px-5'>
                <p className='text-sm mb-4 text-white/80'>
                    <Link href="/">Home</Link> / <span className='text-white'>{crumb}</span>
                </p>
                <h1 className='text-4xl font-bold mb-2'>{title}</h1>
                {desc && <p className='text-white/80'>{desc}</p>}
            </div>
        </div>
    )
}

export default PageHeader
