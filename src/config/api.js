import axios from 'axios';
import { API_URL } from './app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
