import React from 'react';
// Swiper 컴포넌트와 스타일을 불러옵니다.
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import {image1,image2,image3 } from '../../assets/testimgurl'
// 스타일 시트를 불러옵니다 (필수!)
import '../css/MainBanner.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const MainBanner = () => {
  return (
    <Swiper
      // 사용할 모듈 등록
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation // 화살표 사용
      pagination={{ clickable: true }} // 점 버튼 사용
      autoplay={{ delay: 2500, disableOnInteraction: false }} // 자동 재생
      loop={true} // 반복
    >
      <SwiperSlide>
        <img src={image1} alt="배너 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={image2} alt="배너 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </SwiperSlide>
    <SwiperSlide>
        <img src={image3} alt="배너 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </SwiperSlide>
    </Swiper>
  );
};

export default MainBanner;