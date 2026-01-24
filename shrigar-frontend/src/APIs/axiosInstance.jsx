import axios from 'axios'
import { BASE_URL } from '../config/env'

const axiosInstance= axios.create({
    baseURL:BASE_URL,
    headers:{
       "Content-Type": "application/json"

    }
});
// Optional: response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
export default axiosInstance;
