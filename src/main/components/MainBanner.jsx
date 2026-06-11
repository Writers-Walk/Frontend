import React from 'react';
// Swiper 컴포넌트와 스타일을 불러옵니다.
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import {image1,image2,image3 } from '../../assets/testimgurl'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/MainBanner.css';

const MainBanner = () => {
  return (
    <Swiper
      className="mainBanner"
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
    >
      <SwiperSlide>
        <img src={image1} alt="배너 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={image2} alt="배너 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={image3} alt="배너 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default MainBanner;