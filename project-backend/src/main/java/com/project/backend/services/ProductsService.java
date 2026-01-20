package com.project.backend.services;

import com.project.backend.dtos.*;
import com.project.backend.entities.Products;
import com.project.backend.entities.SubCategory;
import com.project.backend.entities.Vendor;

import java.util.List;

public interface ProductsService  {

    // User Products API's

    List<ProductRespDTO> getAllProducts(); // done

    ProductRespDTO getProductById(int id); // done

    List<Products> getProductByCatAndSubcat(int categoryId, int subCategoryId); //done

    List<SubCategory> getAllSubcategories(int categoryId); //done


    //-----------------------------------------------------------------------------------------------//


    // Vendor Products API's

    ProductRespDTO addProduct(Vendor vendor, int categoryId, int subCategoryId, String name,
                        String description, int stock, String status, double price, String images); // done

    List<ProductRespDTO> getAllProductsOfVendor(int vendorId); // done

    void deleteProduct(int id); //done

    ProductRespDTO updateProduct(ProductReqDTO productReqDTO); //done


}
