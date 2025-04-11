import axios from 'axios';

export const API_URL = 'https://jsonplaceholder.typicode.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
