import axios from "axios";

const BASE_URL = "https://qtify-backend-labs.crio.do/api";

export const getTopAlbums = () => axios.get(`${BASE_URL}/albums/top`);
export const getNewAlbums = () => axios.get(`${BASE_URL}/albums/new`);
export const getGenres = () => axios.get(`${BASE_URL}/genres`);
export const getSongs = () => axios.get(`${BASE_URL}/songs`);
