import axios from "axios";
import { getToken } from "../utils/LocalStorage";
import { base_url } from "../utils/config";

const axiosInstance = axios.create({
  baseURL: base_url.url,
  timeout: 15000,
});

// Add token dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // config.headers.token = token;
  }
  return config;
});

// Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response || error)
);

export default axiosInstance;
