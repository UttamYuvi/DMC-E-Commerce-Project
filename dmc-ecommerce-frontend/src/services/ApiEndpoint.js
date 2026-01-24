import { base_url } from "../utils/config";

const ApiEndpoint = {
  getAllCategories: base_url.vendorUrl + "/category",
  addCategoryApi: base_url.vendorUrl + "/category",
  updateCategoryApi: base_url.vendorUrl + "/category/update",
  deleteCategoryApi: base_url.vendorUrl + "/category/delete",
  addSubCategoryApi: base_url.vendorUrl + "/subcategory",
  getAllSubCategories: base_url.vendorUrl + "/subcategory/",
  deleteSubCategoryApi: base_url.vendorUrl + "/subcategory/delete",
  updateSubCategoryApi: base_url.vendorUrl + "/subcategory/update",
  addProductApi: base_url.vendorUrl + "/product", //vednor
  getAllProductApi: base_url.vendorUrl + "/product", //vednor
  deleteProductApi: base_url.vendorUrl + "/product/delete/", //vednor
  updateProductApi: base_url.vendorUrl + "/product/update", //vednor
  updateProductImagesApi: base_url.vendorUrl + "/product/updateProductImages", //vednor
  getproductsByCatAndSubcat: base_url.vendorUrl + "/products/", //user

  getVendorRecentOrders: base_url.vendorUrl + "/order",
  changeOrderStatus: base_url.vendorUrl + "/vendors/status/",
  getTotalSales: base_url.vendorUrl + "/vendors/sales",
  getOrderCount: base_url.vendorUrl + "/order/count",
  getOrderByStatus: base_url.vendorUrl + "/order/byStatus",
  getProductCount: base_url.vendorUrl + "/product/count",
  getSaleAndProfit: base_url.vendorUrl + "/order/sales",
  getAllVendorsApi: base_url.adminUrl + "/vendor/getAllVendors",
  updateVendorStatusApi: base_url.adminUrl + "/vendor/updateVendorStatus",
};

export default ApiEndpoint;
