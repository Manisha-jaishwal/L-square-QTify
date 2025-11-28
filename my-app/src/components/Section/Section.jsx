import React, { useEffect, useState } from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";

function Section({ title, fetchData }) {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchData().then((res) => setData(res.data));
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button
          className={styles.collapseBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      </div>

      {showAll ? (
        <div className={styles.grid}>
          {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              follows={item.follows}
            />
          ))}
        </div>
      ) : (
        <Carousel>
          {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              follows={item.follows}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default Section;
