package com.project.backend.services;

import com.project.backend.dtos.*;
import com.project.backend.entities.Category;
import com.project.backend.entities.Products;

import java.security.Principal;
import java.util.List;

public interface ProductsService  {

    public List<ProductRespDTO> getAllProducts();

    public ProductRespDTO getProductById(int id);

    public Products saveProduct(ProductReqDTO productReqDTO);

    public ProductRespDTO updateProduct(int pid, ProductReqDTO productReqDTO);

    public List<ProductRespDTO> getAllProductsBySubCategoryId(int scid);

    List<ProductRespDTO> findProductsByVendorEmail(String email);


    public Category deleteCategory (int categoryId, int vendorId);
    // Category
    public int updateCategory(int categoryId,String name, String image);
    public List<CategoryReqRespDTO> getAllCategory(int vendorId);

    public Category addNewCategory(String name,String image, Principal principal);
    //String image,
    // Sub-Category
    public List<SubCategoryRespDTO> getAllSubCategoryByCategoryId(int cid);

}
