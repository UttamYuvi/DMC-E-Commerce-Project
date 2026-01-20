import { base_url } from "../utils/config";

const ApiEndpoint = {
  getAllCategories: base_url.vendorUrl + "/category",
  addCategoryApi: base_url.vendorUrl + "/category",
  updateCategoryApi: base_url.vendorUrl + "/category/update",
  deleteCategoryApi: base_url.vendorUrl + "/category/delete",
  addSubCategoryApi: base_url.vendorUrl + "/subcategory",
  getAllSubCategories: base_url.vendorUrl + "/subcategory",
  deleteSubCategoryApi: base_url.vendorUrl + "/subcategory/delete",
  updateSubCategoryApi: base_url.vendorUrl + "/subcategory/update",
  addProductApi: base_url.vendorUrl + "/products/add",
  getAllProductApi: base_url.vendorUrl + "/products/vendor",
  deleteProductApi: base_url.vendorUrl + "/products/delete/",
  updateProductApi: base_url.vendorUrl + "/products/update",
  updateProductImagesApi: base_url.vendorUrl + "/product/updateProductImages",
  // Vendors
  getAllVendorsApi: base_url.adminUrl + "/vendor/getAllVendors",
};

export default ApiEndpoint;
