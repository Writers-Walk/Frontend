import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import { image1, image2, image3 } from '../../assets/testimgurl';
import 'swiper/css';
import 'swiper/css/pagination';
import '../css/SlideBanner.css';

const SlideBanner = () => {
  const slides = [
    { src: image1, alt: '슬라이드 1' },
    { src: image2, alt: '슬라이드 2' },
    { src: image3, alt: '슬라이드 3' },
  ];

  return (
    <div className="slideBannerWrap">
      <Swiper
        className="slideBanner"
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        speed={600}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <img src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideBanner;
