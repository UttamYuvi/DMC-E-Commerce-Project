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
  updateProductImagesApi: base_url.vendorUrl + "/product/updateProductImages", //vednor
  getproductsByCatAndSubcat: base_url.vendorUrl + "/products/", //user

  // Vendor Backend - /Product/ProductController
  addProductApi: base_url.vendorUrl + "/product",
  getAllProductApi: base_url.vendorUrl + "/product",
  getProductCount: base_url.vendorUrl + "/product/count",
  deleteProductApi: base_url.vendorUrl + "/product/delete/",
  updateProductApi: base_url.vendorUrl + "/product/update",

  // Vendor Backend - /Vendor/OrderController
  getVendorRecentOrders: base_url.vendorUrl + "/order",
  getOrderCount: base_url.vendorUrl + "/order/count",
  getOrderByStatus: base_url.vendorUrl + "/order/byStatus",
  changeOrderStatus: base_url.vendorUrl + "/order/status/",
  
  // Vendor Backend - /Vendor/VendorController
  getProfileOfVendor: base_url.vendorUrl + "/vendor",
  updateVendorProfile: base_url.vendorUrl + "/vendor/update" ,
  getTotalSales: base_url.vendorUrl + "/vendor/sales",
  getSaleAndProfit: base_url.vendorUrl + "/vendor/salesandprofit",

  // Backend (Node)
  getAllVendorsApi: base_url.adminUrl + "/vendor/getAllVendors",
  updateVendorStatusApi: base_url.adminUrl + "/vendor/updateVendorStatus",
};

export default ApiEndpoint;
