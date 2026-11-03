import { getSpecificCategory, getSubCategoriesOnCategory } from '@/apis/category'
import { getProductsByCategory } from '@/apis/products'
import { Category } from '@/types/category.t'
import { Product } from '@/types/product.t'
import { SubCategory } from '@/types/subcategory.t'
import Link from 'next/link'
import React from 'react'
import HomeCard from '../../_components/HomeCard/HomeCard'

const CategoryDetails = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const category: Category = await getSpecificCategory(id)

    const subCategories: SubCategory[] = await getSubCategoriesOnCategory(id)

    const data: Product[] = await getProductsByCategory(id)

    return (
        <>
            <div className='bg-gradient-to-r from-green-600 to-green-400 text-white py-12'>
                <div className='w-full md:w-[90%] mx-auto px-5'>
                    <p className='text-sm mb-4 text-white/80'>
                        <Link href="/">Home</Link> / <span className='text-white'>Categories / {category?.name}</span>
                    </p>
                    <h1 className='text-4xl font-bold mb-2'>{category?.name}</h1>
                    <p className='text-white/80'>{data?.length} products</p>
                </div>
            </div>

            <div className='p-5 my-8 w-full md:w-[90%] mx-auto'>

                {subCategories?.length > 0 && <div className='flex flex-wrap gap-3 mb-10'>
                    {subCategories.map(function (sub: SubCategory, idx: number) {
                        return <Link key={idx} href={`/subcategories/${sub._id}`} className='px-4 py-2 rounded-full bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition'>{sub.name}</Link>
                    })}
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

export default CategoryDetails
