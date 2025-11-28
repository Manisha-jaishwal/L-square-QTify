import React, { useRef } from "react";
import styles from "./Carousel.module.css";

function Carousel({ children }) {
  const carouselRef = useRef(null);

  const scroll = (dir) => {
    const container = carouselRef.current;
    const scrollAmount = 300;

    container.scrollBy({
      left: dir === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.leftBtn} onClick={() => scroll("left")}>
        {"<"}
      </button>

      <div className={styles.carousel} ref={carouselRef}>
        {children}
      </div>

      <button className={styles.rightBtn} onClick={() => scroll("right")}>
        {">"}
      </button>
    </div>
  );
}

export default Carousel;
