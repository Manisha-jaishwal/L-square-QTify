import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Section from "../Section/Section";
import styles from "./SongsSection.module.css";

function SongsSection() {
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const [genresRes, songsRes] = await Promise.all([
          axios.get("https://qtify-backend.labs.crio.do/genres"),
          axios.get("https://qtify-backend.labs.crio.do/songs"),
        ]);

        // 🔥 Correct extraction based on your screenshots
        const genreData = genresRes.data.data || [];   // wrapped inside data
        const songsData = songsRes.data || [];         // pure array

        setGenres([{ key: "all", label: "All" }, ...genreData]);
        setSongs(songsData);

      } catch (err) {
        console.error("ERROR:", err);
      }
    }

    load();
  }, []);

  const filtered =
    selectedGenre === "all"
      ? songs
      : songs.filter((s) => s.genre?.key === selectedGenre);

  console.log("Filtered songs →", filtered);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Songs</h2>

      <Tabs
        value={selectedGenre}
        onChange={(e, v) => setSelectedGenre(v)}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#34c94b", height: 4 } }}
        className={styles.tabs}
      >
        {genres.map((g) => (
          <Tab key={g.key} value={g.key} label={g.label} />
        ))}
      </Tabs>

      <Section
        title=""
        dataOverride={filtered}
        isSongs={true}
        showButton={false}
        hideHeader={true}
      />
    </section>
  );
}

export default SongsSection;
