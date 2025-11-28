// src/components/Section/Section.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";

function Section({
  title,
  fetchUrl,
  dataOverride,
  isSongs = false,
  showButton = true,
  hideHeader = false,
}) {
  const [data, setData] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {

        // 🔥 If songs override exists → USE IT and DO NOT fetch albums
        if (Array.isArray(dataOverride)) {
          setData(dataOverride);
          return;
        }

        // 🔥 For Albums only → fetch using URL
        if (fetchUrl) {
          const res = await axios.get(fetchUrl);
          setData(res.data || []);
        }

      } catch (err) {
        console.log("SECTION ERROR:", err);
      }
    }

    loadData();
  }, [fetchUrl, dataOverride]);

  // 🔥 Songs ALWAYS show carousel
  const showCarousel = showButton ? collapsed : true;
  const showGrid = showButton ? !collapsed : false;

  return (
    <div className={styles.section}>

      {/* Header — hidden for Songs */}
      <div
        className={styles.header}
        style={{ display: hideHeader ? "none" : "flex" }}
      >
        <h3>{title}</h3>

        {showButton && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={styles.toggle}
          >
            {collapsed ? "Show all" : "Collapse"}
          </button>
        )}
      </div>

      {/* 🔥 Songs + Albums both go through this */}
      {showCarousel && <Carousel data={data} isSongs={isSongs} />}

      {/* 🔥 Only albums use grid - NOT songs */}
      {showGrid && (
        <div className={styles.grid}>
          {data.map((item) => (
            <Card key={item.id} data={item} isSongs={isSongs} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;
