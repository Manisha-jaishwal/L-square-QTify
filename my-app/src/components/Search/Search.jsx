import React, { useState } from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { truncate } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

function Search({ searchData, placeholder }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFiltered([]);
      return;
    }

    const results = (searchData || []).filter((album) =>
      album.title.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(results);
  };

  const handleSelect = (album) => {
    setQuery(album.title);
    setFiltered([]);
    navigate(`/album/${album.slug}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filtered.length > 0) {
      navigate(`/album/${filtered[0].slug}`);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={handleChange}
          className={styles.search}
          placeholder={placeholder}
        />
        <button className={styles.searchButton}>
          <SearchIcon />
        </button>
      </form>

      {filtered.length > 0 && (
        <ul className={styles.listBox}>
          {filtered.map((album) => (
            <li
              className={styles.listElement}
              key={album.slug}
              onClick={() => handleSelect(album)}
            >
              <p className={styles.albumTitle}>{album.title}</p>
              <p className={styles.albumArtists}>
                {truncate(album.songs?.map((s) => s.artists).flat().join(", "), 40)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
