import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import { fetchTopAlbums, fetchNewAlbums } from "./helpers/api";

function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <Section title="Top Albums" fetchData={fetchTopAlbums} />
      <Section title="New Albums" fetchData={fetchNewAlbums} />
    </>
  );
}

export default App;
