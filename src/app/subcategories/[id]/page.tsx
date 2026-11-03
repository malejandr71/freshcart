import { getSpecificSubCategory } from '@/apis/subcategories'
import { getProductsBySubCategory } from '@/apis/products'
import { Product } from '@/types/product.t'
import { SubCategory } from '@/types/subcategory.t'
import Link from 'next/link'
import React from 'react'
import HomeCard from '../../_components/HomeCard/HomeCard'

const SubCategoryDetails = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const subCategory: SubCategory = await getSpecificSubCategory(id)

    const data: Product[] = await getProductsBySubCategory(id)

    return (
        <>
            <div className='bg-gradient-to-r from-green-600 to-green-400 text-white py-12'>
                <div className='w-full md:w-[90%] mx-auto px-5'>
                    <p className='text-sm mb-4 text-white/80'>
                        <Link href="/">Home</Link> / <span className='text-white'>SubCategories / {subCategory?.name}</span>
                    </p>
                    <h1 className='text-4xl font-bold mb-2'>{subCategory?.name}</h1>
                    <p className='text-white/80'>{data?.length} products</p>
                </div>
            </div>

            <div className='p-5 my-8 w-full md:w-[90%] mx-auto'>

                <Link href={`/categories/${subCategory?.category}`} className='inline-block mb-8 text-green-600 font-medium'>← Back to category</Link>

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

export default SubCategoryDetails
