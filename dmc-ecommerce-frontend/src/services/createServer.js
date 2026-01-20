const createServer = (axiosInstance) => ({
  get: async (url, params = {}) => {
    return axiosInstance.get(url, { params });
  },

  post: async (url, body = {}, isFormData = false) => {
    return axiosInstance.post(url, body, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
  },

  put: async (url, body = {}, isFormData = false) => {
    return axiosInstance.put(url, body, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
  },

  delete: async (url, params = {}) => {
    return axiosInstance.delete(url, { params });
  },
});

export default createServer;
