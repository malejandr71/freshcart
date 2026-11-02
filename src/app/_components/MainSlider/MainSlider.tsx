"use client"
import React from 'react'
import Style from "./MainSlider.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

const MainSlider = () => {

    const slides = [
        { title: "Fresh Products Delivered to your Door", desc: "Get 20% off your first order" },
        { title: "Premium Quality Guaranteed", desc: "Fresh from farm to your table" },
        { title: "Fast & Free Delivery", desc: "Same day delivery available" },
    ]

    return (
        <div className={`w-full ${Style.slider}`}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {slides.map(function (slide, idx: number) {
                    return <SwiperSlide key={idx}>
                        <div className={`h-100 relative ${Style.test}`}>
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-green-600/90 to-green-500/40"></div>

                            <div className='relative h-full w-full md:w-[90%] mx-auto px-16 flex flex-col justify-center text-white'>
                                <h2 className='text-3xl md:text-4xl font-bold max-w-md leading-tight mb-4'>{slide.title}</h2>
                                <p className='text-lg mb-6'>{slide.desc}</p>
                                <div className='flex gap-3'>
                                    <Link href="/" className='bg-white text-green-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-green-50 transition'>Shop Now</Link>
                                    <Link href="/categories" className='border-2 border-white/70 font-semibold px-6 py-2 rounded-lg hover:bg-white/10 transition'>View Deals</Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}

export default MainSlider
