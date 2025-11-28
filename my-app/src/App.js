import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import SongsSection from "./components/SongsSection/SongsSection";

function App() {
  return (
    <div className="App">
      <Navbar searchData={[]} />
      <Hero />

      {/* Top Albums */}
      <Section
        title="Top Albums"
        fetchUrl="https://qtify-backend.labs.crio.do/albums/top"
      />

      {/* New Albums */}
      <Section
        title="New Albums"
        fetchUrl="https://qtify-backend.labs.crio.do/albums/new"
      />

      {/* Songs */}
      <SongsSection />
    </div>
  );
}

export default App;
