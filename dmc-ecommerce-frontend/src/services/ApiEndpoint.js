import { base_url } from "../utils/config";

const ApiEndpoint = {
  getAllCategories: base_url.url + "/category/vendor",
  addCategoryApi: base_url.url + "/category/vendor",
  updateCategoryApi: base_url.url + "/category/vendor/update",
  deleteCategoryApi: base_url.url + "/category/vendor/delete",
  addSubCategoryApi: base_url.url + "/subcategory",
  getAllSubCategories: base_url.url + "/subcategory",
  deleteSubCategoryApi: base_url.url + "/subcategory/delete",
  updateSubCategoryApi: base_url.url + "/subcategory/update",
};

export default ApiEndpoint;
