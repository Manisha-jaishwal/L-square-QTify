import React from "react";
import styles from "./Card.module.css";

function Card({ data, isSongs = false }) {
  if (!data) return null;

  return (
    <div className={styles.card}>
      <img src={data.image} alt={data.title} className={styles.image} />

      <div className={styles.info}>
        <span className={styles.chip}>
          {isSongs ? `${data.likes} Likes` : `${data.follows} Follows`}
        </span>
        <p className={styles.title}>{data.title}</p>
      </div>
    </div>
  );
}

export default Card;
