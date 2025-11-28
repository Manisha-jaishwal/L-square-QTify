import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";

function Section({ title, fetchUrl, dataOverride, isSongs = false }) {
  const [data, setData] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    async function loadSection() {
      try {
        if (dataOverride) {
          setData(dataOverride);
          return;
        }

        const response = await axios.get(fetchUrl);
        setData(response.data);
      } catch (err) {
        console.log("SECTION ERROR:", err);
      }
    }
    loadSection();
  }, [fetchUrl, dataOverride]);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button onClick={() => setCollapsed(!collapsed)} className={styles.toggle}>
          {collapsed ? "Show all" : "Collapse"}
        </button>
      </div>

      {collapsed ? (
        <Carousel data={data} />
      ) : (
        <div className={styles.grid}>
          {data.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;
