import axios from 'axios';
import { apiUrl } from 'utils/apiUrl';

const api = axios.create({
  baseURL: apiUrl
});

export default api;
