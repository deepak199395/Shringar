import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "./Carousel.css";
import "swiper/css";
import "swiper/css/pagination";

// ✅ IMPORT IMAGES
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";
import banner4 from "../../../assets/images/banner4.jpg";
import banner5 from "../../../assets/images/banner5.jpg";
import banner6 from "../../../assets/images/banner6.png";
import banner7 from "../../../assets/images/banner7.png";
import banner8 from "../../../assets/images/banner8.png";


const images = [banner1, banner2, banner3, banner4, banner5,banner6,banner7,banner8];

const Carousel = () => {

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3500 }}
      pagination={{ clickable: true }}
      loop={true}
      className="shringar-carousel"
    >
      {images.map((img, index) => ( 
        <SwiperSlide key={index}>
          <img src={img || null} alt={`slide-${index}`} />
      </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
