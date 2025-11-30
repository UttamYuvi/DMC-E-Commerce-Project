import ApiEndpoint from "./ApiEndpoint";
import Server from "./callServer";

const serverData = {
  allCategories: async (filters = {}) => {
    return Server.get(ApiEndpoint.getAllCategories, filters);
  },
  addCategory: async (formData) => {
    return Server.post(ApiEndpoint.addCategoryApi, formData, true);
  },
  updateCategory: async (formData) => {
    return Server.post(ApiEndpoint.updateCategoryApi, formData, true);
  },
  deleteCategory: async (filters = {}) => {
    return Server.post(ApiEndpoint.deleteCategoryApi, filters);
  },
};

export default serverData;
