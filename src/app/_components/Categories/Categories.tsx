import { getAllCategories } from '@/apis/category'
import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Category } from '@/types/category.t'

const Categories = async () => {

    const data: Category[] = await getAllCategories()

    console.log(data);

    return (
        <div className='p-5 w-full md:w-[80%] mx-auto'>
            <CategorySlider categories={data} />
        </div>
    )
}

export default Categories
