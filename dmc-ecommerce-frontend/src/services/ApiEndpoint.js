import { base_url } from "../utils/config";

const ApiEndpoint = {
  getAllCategories: base_url.url + "/category",
  addCategoryApi: base_url.url + "/category",
  updateCategoryApi: base_url.url + "/category/update",
  deleteCategoryApi: base_url.url + "/category/delete",
};

export default ApiEndpoint;
