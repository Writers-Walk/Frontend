import React from 'react';
// Swiper 컴포넌트와 스타일을 불러옵니다.
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import useBanner from '../api/bannerapi';

// import banner1 from '../../assets/banner1.jpg'
// import banner2 from '../../assets/banner2.jpg'
// // import banner3 from '../../assets/banner3.jpg'
// import {image3 } from '../../assets/testimgurl'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/MainBanner.css';

// const MainBanner = () => {
//   return (
//     <Swiper
//       className="mainBanner"
//       modules={[Navigation, Pagination, Autoplay]}
//       spaceBetween={0}
//       slidesPerView={1}
//       navigation
//       pagination={{ clickable: true }}
//       autoplay={{ delay: 2500, disableOnInteraction: false }}
//       loop={true}
//     >
//       <SwiperSlide>

//         <img src={banner1} alt="배너 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={banner2} alt="배너 2" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
//       </SwiperSlide>
//     <SwiperSlide>
//         <img src={image3} alt="배너 3" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
//     </SwiperSlide>

//     </Swiper>
//   );
// };

//export default MainBanner;

// 연동하면 주석 풀기 
const MainBanner = () => {
  // 훅 실행
  const { banners, loading, error } = useBanner();

  if (loading) return <div>배너 로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <Swiper 
      className="mainBanner"
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}>
      <SwiperSlide>
        
        <img src={banners.aiRecommendurl} alt="AI 추천" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banners.besturl} alt="베스트" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={banners.latesturl} alt="최신" />
      </SwiperSlide>
    </Swiper>
  );
};

export default MainBanner;