// src/components/Carousel/Carousel.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Card from "../Card/Card";
import styles from "./Carousel.module.css";

function Carousel({ data = [], isSongs = false }) {
  return (
    <div className={styles.carousel}>
      <Swiper
        slidesPerView={7}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Card data={item} isSongs={isSongs} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
