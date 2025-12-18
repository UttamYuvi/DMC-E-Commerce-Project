import ApiEndpoint from "./ApiEndpoint";
import Server from "./callServer";

const serverData = {
  // Category CURD
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
  //SubCategory CURD
  addSubCategory: async (formData) => {
    return Server.post(ApiEndpoint.addSubCategoryApi, formData, true);
  },
  allSubCategories: async (filters = {}) => {
    return Server.get(ApiEndpoint.getAllSubCategories, filters);
  },
  deleteSubCategory: async (filters = {}) => {
    return Server.post(ApiEndpoint.deleteSubCategoryApi, filters);
  },
  updateSubCategory: async (formData) => {
    return Server.post(ApiEndpoint.updateSubCategoryApi, formData, true);
  },
  //products
  addProduct: async (formData) => {
    return Server.post(ApiEndpoint.addProductApi, formData, true);
  },
  allProductList: async (filters = {}) => {
    return Server.get(ApiEndpoint.getAllProductApi, filters);
  },
  deleteProduct: async (filters = {}) => {
    return Server.post(ApiEndpoint.deleteProductApi, filters);
  },
  updateProduct: async (filters) => {
    return Server.post(ApiEndpoint.updateProductApi, filters);
  },
  updateProductImages: async (formData) => {
    return Server.post(ApiEndpoint.updateProductImagesApi, formData, true);
  },
};

export default serverData;
