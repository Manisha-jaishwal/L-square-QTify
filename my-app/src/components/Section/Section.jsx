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
        if (dataOverride && Array.isArray(dataOverride)) {
          setData(dataOverride);
          return;
        }

        if (fetchUrl) {
          const response = await axios.get(fetchUrl);
          setData(response.data || []);
        }
      } catch (err) {
        console.log("SECTION ERROR:", err);
      }
    }

    loadData();
  }, [fetchUrl, dataOverride]);

  // Songs section → ALWAYS carousel, NEVER grid
  const showCarousel = showButton ? collapsed : true;
  const showGrid = showButton ? !collapsed : false;

  return (
    <div className={styles.section}>
      {/* HEADER */}
      <div
        className={styles.header}
        style={{ display: hideHeader ? "none" : "flex" }}
      >
        <h3>{title}</h3>

        {showButton && data.length > 0 && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={styles.toggle}
          >
            {collapsed ? "Show all" : "Collapse"}
          </button>
        )}
      </div>

      {/* CAROUSEL */}
      {showCarousel && <Carousel data={data} isSongs={isSongs} />}

      {/* GRID VIEW (only for albums) */}
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
