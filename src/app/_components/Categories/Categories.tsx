import { getAllCategories } from '@/apis/category'
import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Category } from '@/types/category.t'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

const Categories = async () => {

    const data: Category[] = await getAllCategories()

    console.log(data);

    return (
        <div className='p-5 my-8 w-full md:w-[90%] mx-auto'>

            <div className='flex justify-between items-center mb-8'>
                <h2 className='text-3xl font-bold border-s-4 border-green-600 ps-3'>Shop By <span className='text-green-600'>Category</span></h2>
                <Link href="/categories" className='text-green-600 font-medium flex items-center gap-2 hover:gap-3 transition-all'>View All Categories <FaArrowRight /></Link>
            </div>

            <CategorySlider categories={data} />
        </div>
    )
}

export default Categories
