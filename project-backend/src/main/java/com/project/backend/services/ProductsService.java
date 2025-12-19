package com.project.backend.services;

import com.project.backend.dtos.*;
import com.project.backend.entities.Products;

import java.util.List;

public interface ProductsService  {

    List<ProductRespDTO> getAllProducts(); // done user

    ProductRespDTO getProductById(int id); // done user

    Products saveProduct(ProductReqDTO productReqDTO, int vendorId); // done user

    List<ProductRespDTO> getAllProductsOfVendor(int vendorId); // done vendor

    ProductRespDTO updateProduct(int pid, ProductReqDTO productReqDTO);

    void deleteProduct(int id);

    ProductRespDTO updateProduct(ProductReqDTO productReqDTO);


}
