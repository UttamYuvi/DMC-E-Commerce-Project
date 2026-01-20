import axios from "axios";
import { base_url } from "../../utils/config";
import { getAdminToken } from "../../utils/LocalStorage";

const adminAxios = axios.create({
  baseURL: base_url.adminUrl,
  timeout: 15000,
});

adminAxios.interceptors.request.use((config) => {
  const adminToken = getAdminToken();
  if (adminToken) {
    config.headers.token = adminToken;
  }
  return config;
});

adminAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response || error)
);

export default adminAxios;
