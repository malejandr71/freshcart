"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Category } from '@/types/category.t';
import Image from 'next/image';

const CategorySlider = ({ categories }: { categories: Category[] }) => {
    return (
        <div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={2}
                breakpoints={{ 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }}
                autoplay={{ delay: 3000 }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {categories.map(function (category: Category, idx: number) {
                    return <SwiperSlide key={idx} className='py-2'>
                        <div className='bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition p-4 text-center'>
                            <Image src={category.image} width={500} height={500} className='size-20 rounded-full object-cover mx-auto' alt={category.name} />
                            <p className='mt-3 text-slate-700 truncate'>{category.name}</p>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}

export default CategorySlider
