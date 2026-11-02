import { getSpecificBrand } from '@/apis/brands'
import { getProductsByFilter } from '@/apis/products'
import { Brand } from '@/types/brand.t'
import { Product } from '@/types/product.t'
import Image from 'next/image'
import React from 'react'
import PageHeader from '../../_components/PageHeader/PageHeader'
import HomeCard from '../../_components/HomeCard/HomeCard'

const BrandDetails = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const brand: Brand = await getSpecificBrand(id)

    const { data }: { data: Product[] } = await getProductsByFilter(`brand=${id}`)

    return (
        <>
            <PageHeader title={brand?.name} desc={`${data?.length ?? 0} products`} crumb={`Brands / ${brand?.name}`} color='purple' />

            <div className='p-5 my-8 w-full md:w-[90%] mx-auto'>

                {brand?.image && <div className='bg-white border rounded-2xl p-4 inline-block mb-8'>
                    <Image src={brand.image} alt={brand.name} width={160} height={100} className='h-20 w-auto object-contain' />
                </div>}

                {data?.length === 0 ? <h2 className='text-3xl text-center text-red-500 py-10'>No Data to Diaplay It</h2> :
                    <div className='grid grid-cols-12 xl:grid-cols-5 gap-5'>
                        {data?.map(function (product: Product, idx: number) {
                            return <HomeCard product={product} key={idx} />
                        })}
                    </div>}
            </div>
        </>
    )
}

export default BrandDetails
