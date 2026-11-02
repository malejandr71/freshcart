import { getAllCategories } from '@/apis/category'
import { Category } from '@/types/category.t'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Categories = async () => {

    const data: Category[] = await getAllCategories()

    return (
        <>
            <div className='bg-gradient-to-r from-green-600 to-green-400 text-white py-12'>
                <div className='w-full md:w-[80%] mx-auto px-5'>
                    <p className='text-sm mb-4 text-white/80'>
                        <Link href="/">Home</Link> / <span className='text-white'>Categories</span>
                    </p>
                    <h1 className='text-4xl font-bold mb-2'>All Categories</h1>
                    <p className='text-white/80'>Browse our wide range of product categories</p>
                </div>
            </div>

            <div className='my-10'>
                <div className='p-5 w-full md:w-[80%] mx-auto'>
                    <div className='grid grid-cols-10 gap-4'>
                        {data.map(function (category: Category, idx: number) {
                            return <div key={idx} className='col-span-10 sm:col-span-5 md:col-span-2'>
                                <div className='bg-white rounded-2xl border p-4 text-center hover:shadow-lg hover:border-green-300 transition'>
                                    <Image src={category.image} alt={category.name} width={300} height={300} className='w-full h-40 object-cover rounded-xl mb-3' />
                                    <p className='font-semibold'>{category.name}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories
