"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Category } from '@/types/category.t';
import Image from 'next/image';

const CategorySlider = ({ categories }: { categories: Category[] }) => {
    return (
        <div>
            <Swiper
                spaceBetween={0}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {categories.map(function (category: Category, idx: number) {
                    return <SwiperSlide key={idx}>
                        <Image src={category.image} width={500} height={500} className='w-full h-[200px] object-cover' alt="" />
                        <p className='text-lg mt-2 mb-6 '>{category.name}</p>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}

export default CategorySlider
