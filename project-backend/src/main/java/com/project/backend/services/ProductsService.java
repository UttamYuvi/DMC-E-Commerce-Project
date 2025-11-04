package com.project.backend.services;

import com.project.backend.dtos.CategoryReqRespDTO;
import com.project.backend.dtos.ProductReqDTO;
import com.project.backend.dtos.ProductRespDTO;
import com.project.backend.dtos.SubCategoryRespDTO;
import com.project.backend.entities.Products;
import com.project.backend.entities.Vendor;

import java.util.List;

public interface ProductsService  {

    public List<ProductRespDTO> getAllProducts();

    public ProductRespDTO getProductById(int id);

    public Products saveProduct(ProductReqDTO productReqDTO);

    public ProductRespDTO updateProduct(int pid, ProductReqDTO productReqDTO);

    public List<ProductRespDTO> getAllProductsBySubCategoryId(int scid);

    List<ProductRespDTO> findProductsByVendorId(int vid);


    // Category
    public List<CategoryReqRespDTO> getAllCategory();
    // Sub-Category
    public List<SubCategoryRespDTO> getAllSubCategoryByCategoryId(int cid);

}
