import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styles from "./SongsSection.module.css";
import Section from "../Section/Section";

function SongsSection() {
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSongsAndGenres() {
      try {
        const [genresRes, songsRes] = await Promise.all([
          axios.get("https://qtify-backend.labs.crio.do/genres"),
          axios.get("https://qtify-backend.labs.crio.do/songs"),
        ]);

        // FIX HERE 🔥
        const genresData = genresRes.data.data || [];
        const songsData = songsRes.data.data || [];

        setGenres([{ key: "all", label: "All" }, ...genresData]);
        setSongs(songsData);

      } catch (err) {
        console.error("Error loading songs/genres", err);
      } finally {
        setLoading(false);
      }
    }

    loadSongsAndGenres();
  }, []);

  const filteredSongs =
    selectedGenre === "all"
      ? songs
      : songs.filter(
          (song) => song.genre && song.genre.key === selectedGenre
        );

  if (loading) {
    return (
      <section className={styles.wrapper}>
        <h2 className={styles.title}>Songs</h2>
        <p className={styles.loading}>Loading songs...</p>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Songs</h2>

      {/* GENRE TABS */}
      <Tabs
        value={selectedGenre}
        onChange={(e, newValue) => setSelectedGenre(newValue)}
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: "#34c94b", height: 4 },
        }}
        className={styles.tabs}
      >
        {genres.map((g) => (
          <Tab
            key={g.key}
            value={g.key}
            label={g.label}
            className={styles.tab}
          />
        ))}
      </Tabs>

      <div className={styles.carouselWrapper}>
        <Section
          title=""
          dataOverride={filteredSongs}
          isSongs={true}
          showButton={false}
          hideHeader={true}
        />
      </div>
    </section>
  );
}

export default SongsSection;
