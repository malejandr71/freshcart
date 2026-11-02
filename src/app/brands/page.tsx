import { getAllBrands } from '@/apis/brands'
import { Brand } from '@/types/brand.t'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PageHeader from '../_components/PageHeader/PageHeader'

const Brands = async () => {

    const data: Brand[] = await getAllBrands()

    return (
        <>
            <PageHeader title='Top Brands' desc='Shop from your favorite brands' crumb='Brands' color='purple' />

            <div className='my-10'>
                <div className='p-5 w-full md:w-[90%] mx-auto'>
                    <div className='grid grid-cols-12 gap-4'>
                        {data.map(function (brand: Brand, idx: number) {
                            return <div key={idx} className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'>
                                <Link href={`/brands/${brand._id}`} className='block bg-white rounded-2xl border p-4 text-center hover:shadow-lg hover:border-violet-300 transition'>
                                    <Image src={brand.image} alt={brand.name} width={200} height={200} className='w-full h-24 object-contain mb-3' />
                                    <p className='font-semibold'>{brand.name}</p>
                                </Link>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Brands
