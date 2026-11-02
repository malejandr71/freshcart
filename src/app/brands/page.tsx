import { getAllBrands } from '@/apis/brands'
import { Brand } from '@/types/brand.t'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Brands = async () => {

    const data: Brand[] = await getAllBrands()

    return (
        <>
            <div className='bg-gradient-to-r from-violet-600 to-purple-400 text-white py-12'>
                <div className='w-full md:w-[80%] mx-auto px-5'>
                    <p className='text-sm mb-4 text-white/80'>
                        <Link href="/">Home</Link> / <span className='text-white'>Brands</span>
                    </p>
                    <h1 className='text-4xl font-bold mb-2'>Top Brands</h1>
                    <p className='text-white/80'>Shop from your favorite brands</p>
                </div>
            </div>

            <div className='my-10'>
                <div className='p-5 w-full md:w-[80%] mx-auto'>
                    <div className='grid grid-cols-12 gap-4'>
                        {data.map(function (brand: Brand, idx: number) {
                            return <div key={idx} className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'>
                                <div className='bg-white rounded-2xl border p-4 text-center hover:shadow-lg hover:border-violet-300 transition'>
                                    <Image src={brand.image} alt={brand.name} width={200} height={200} className='w-full h-24 object-contain mb-3' />
                                    <p className='font-semibold'>{brand.name}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Brands
