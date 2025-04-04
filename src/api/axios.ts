import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
});

export default axiosInstance;
