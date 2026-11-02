"use client"
import React from 'react'
import Style from "./MainSlider.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const MainSlider = () => {
    return (
        <div className='w-full'>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <div className={`h-125 relative ${Style.test}`}>
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-green-600/50"></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`h-125 relative ${Style.test}`}>
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-green-600/50"></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`h-125 relative ${Style.test}`}>
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-green-600/50"></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default MainSlider
