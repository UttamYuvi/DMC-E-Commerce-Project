import axios from "axios";
import { base_url } from "../../utils/config";
import { getVendorToken } from "../../utils/LocalStorage";

const vendorAxios = axios.create({
  baseURL: base_url.vendorUrl,
  timeout: 15000,
});

vendorAxios.interceptors.request.use((config) => {
  const token = getVendorToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

vendorAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response || error)
);

export default vendorAxios;
