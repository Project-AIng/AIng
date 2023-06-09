import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/Banner.css';
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Banner() {
    return (
            <div className="swiper-container">
                <Swiper
                spaceBetween={0} // 슬라이드간의 간격
                slidesPerView={1} // 한 번에 보여지는 슬라이드 개수
                loop={true} // 루프 슬라이드
                autoplay={{ delay: 3000 }} // 자동
                navigation
                pagination={{ clickable: true }}
                >
                    <SwiperSlide className='slide'>
                    <img src="/images/banner1.png" alt="banner1" className='BannerImage'/>
                    </SwiperSlide>
                    <SwiperSlide className='slide'>
                    <img src="/images/banner2.png" alt="banner2" className='BannerImage'/>
                    </SwiperSlide>
                </Swiper>
            </div>
    );
}
