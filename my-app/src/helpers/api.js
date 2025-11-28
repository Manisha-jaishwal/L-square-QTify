import axios from "axios";

export const fetchTopAlbums = () =>
  axios.get("https://qtify-backend.labs.crio.do/albums/top");

export const fetchNewAlbums = () =>
  axios.get("https://qtify-backend.labs.crio.do/albums/new");

export const fetchSongs = () =>
  axios.get("https://qtify-backend.labs.crio.do/songs");
