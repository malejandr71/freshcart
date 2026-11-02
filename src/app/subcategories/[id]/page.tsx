import { getSpecificSubCategory } from '@/apis/subcategories'
import { getProductsByFilter } from '@/apis/products'
import { Product } from '@/types/product.t'
import { SubCategory } from '@/types/subcategory.t'
import Link from 'next/link'
import React from 'react'
import PageHeader from '../../_components/PageHeader/PageHeader'
import HomeCard from '../../_components/HomeCard/HomeCard'

const SubCategoryDetails = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const subCategory: SubCategory = await getSpecificSubCategory(id)

    const { data }: { data: Product[] } = await getProductsByFilter(`subcategory=${id}`)

    return (
        <>
            <PageHeader title={subCategory?.name} desc={`${data?.length ?? 0} products`} crumb={`SubCategories / ${subCategory?.name}`} />

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
