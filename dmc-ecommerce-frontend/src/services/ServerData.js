import { Api } from "@mui/icons-material";
import ApiEndpoint from "./ApiEndpoint";
import AdminServer from "./server/AdminServer";
import VendorServer from "./server/VendorServer";

const serverData = {
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
  updateVendorStatus: async (data)=>{
    return AdminServer.post(ApiEndpoint.updateVendorStatusApi, data);            
  },
  getProductsByCat_Subcat: async (categoryId, subCategoryId) => {
    return VendorServer.get(
      ApiEndpoint.getproductsByCatAndSubcat + `${categoryId}/${subCategoryId}`
    );
  },
  getVendorProfile: async () => {
    return VendorServer.get(ApiEndpoint.getProfileOfVendor)
  },
  updateProfileOfVendor: async (user) => {
    return VendorServer.post(ApiEndpoint.updateVendorProfile,user)
  },
  allVendorRecentOrder:  async () => {
    return VendorServer.get(ApiEndpoint.getVendorRecentOrders)
  },
  updateOrderStatus: async (filters) => {
    return VendorServer.post(ApiEndpoint.changeOrderStatus + filters.id, filters.status)
  },
  getTotalSales: async () => {
    return VendorServer.get(ApiEndpoint.getTotalSales)
  },
  getOrderCount: async () => {
    return VendorServer.get(ApiEndpoint.getOrderCount)
  },
  getProductCount: async () => {
    return VendorServer.get(ApiEndpoint.getProductCount)
  },
  getOrderByStatus: async (filters) => {
    return VendorServer.post(ApiEndpoint.getOrderByStatus, filters)
  },
  getSaleAndProfit: async () => {
    return VendorServer.get(ApiEndpoint.getSaleAndProfit)
  },

  //admin
  getAllVendors: async () => {
  return AdminServer.get("/vendor/getAllVendors");
},

getActiveVendors: async () => {
  return AdminServer.get("/vendor/getActiveVendors");
},

getInactiveVendors: async () => {
  return AdminServer.get("/vendor/getInactiveVendors");
},

};

export default serverData;
