import axiosInstance from "./AxiosInstance";

const Server = {
  get: async (url, params = {}) => {
    return axiosInstance.get(url, { params });
  },

  post: async (url, body = {}, isFormData = false) => {
    return axiosInstance.post(url, body, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
  },

  put: async (url, body = {}, isFormData = false) => {
    return axiosInstance.put(url, body, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
  },

  delete: async (url, params = {}) => {
    return axiosInstance.delete(url, { params });
  },
};

export default Server;
