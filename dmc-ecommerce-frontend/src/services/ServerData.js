import ApiEndpoint from "./ApiEndpoint";
import AdminServer from "./server/AdminServer";
import VendorServer from "./server/VendorServer";

const serverData = {
  // Category CURD
  // allCategories: async (filters = {}) => {
  //   return VendorServer.get(ApiEndpoint.getAllCategories, filters);
  // },
  // addCategory: async (formData) => {
  //   return Server.post(ApiEndpoint.addCategoryApi, formData, true);
  // },
  // updateCategory: async (formData) => {
  //   return Server.post(ApiEndpoint.updateCategoryApi, formData, true);
  // },
  // deleteCategory: async (filters = {}) => {
  //   return Server.post(ApiEndpoint.deleteCategoryApi, filters);
  // },
  //SubCategory CURD
  // addSubCategory: async (formData) => {
  //   return Server.post(ApiEndpoint.addSubCategoryApi, formData, true);
  // },
  // allSubCategories: async (filters = {}) => {
  //   return Server.get(ApiEndpoint.getAllSubCategories, filters);
  // },
  // deleteSubCategory: async (filters = {}) => {
  //   return Server.post(ApiEndpoint.deleteSubCategoryApi, filters);
  // },
  // updateSubCategory: async (formData) => {
  //   return Server.post(ApiEndpoint.updateSubCategoryApi, formData, true);
  // },

  //products
  addProduct: async (formData) => {
    return VendorServer.post(ApiEndpoint.addProductApi, formData, true);
  },
  allProductList: async (filters = {}) => {
    return VendorServer.get(ApiEndpoint.getAllProductApi, filters);
  },
  deleteProduct: async (id) => {
    return VendorServer.delete(ApiEndpoint.deleteProductApi + id);
  },
  updateProduct: async (filters) => {
    return VendorServer.post(ApiEndpoint.updateProductApi, filters);
  },
  updateProductImages: async (formData) => {
    return VendorServer.post(
      ApiEndpoint.updateProductImagesApi,
      formData,
      true
    );
  },

  // Vendors
  allVendorsList: async (filters = {}) => {
    return AdminServer.get(ApiEndpoint.getAllVendorsApi, filters);
  },
};

export default serverData;
