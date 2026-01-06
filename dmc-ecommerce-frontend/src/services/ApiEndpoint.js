import { base_url } from "../utils/config";

const ApiEndpoint = {
  getAllCategories: base_url.url + "/category",
  addCategoryApi: base_url.url + "/category",
  updateCategoryApi: base_url.url + "/category/update",
  deleteCategoryApi: base_url.url + "/category/delete",
  addSubCategoryApi: base_url.url + "/subcategory",
  getAllSubCategories: base_url.url + "/subcategory/",
  deleteSubCategoryApi: base_url.url + "/subcategory/delete",
  updateSubCategoryApi: base_url.url + "/subcategory/update",
  addProductApi: base_url.url + "/product", //vednor
  getAllProductApi: base_url.url + "/product", //vednor
  deleteProductApi: base_url.url + "/product/delete/",  //vednor
  updateProductApi: base_url.url + "/product/update", //vednor
  updateProductImagesApi: base_url.url + "/product/updateProductImages", //vednor
  getproductsByCatAndSubcat: base_url.url + "/products/" //user
};

export default ApiEndpoint;
