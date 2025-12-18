package com.project.backend.services;

import com.project.backend.entities.Category;
import com.project.backend.entities.SubCategory;
import com.project.backend.repository.CategoryRepository;
import com.project.backend.repository.ProductsRepository;
import com.project.backend.dtos.*;
import com.project.backend.entities.Products;
import com.project.backend.repository.SubCategoryRepository;
import com.project.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductsServiceImpl implements ProductsService{

    @Autowired
    EntityMapper mapper;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    //done  /user
    public List<ProductRespDTO> getAllProducts() {
        List<ProductRespDTO> productRespDTOS = new ArrayList<>();
        for(Products product : productsRepository.findAll()) {
            productRespDTOS.add(mapper.productToProductRespDTO(product));
        }
        return productRespDTOS;
    }

    //done  //user
    public ProductRespDTO getProductById(int id) {
        return mapper.productToProductRespDTO(productsRepository.findById(id).get());
    }

    // done  //vendor
    public Products saveProduct(ProductReqDTO productReqDTO,int vendorId) {
        return productsRepository.save(new Products()); //mapper.productReqToProducts(productReqDTO,vendorId)
    }

    //done  //vendor
    @Override
    public List<Products> getAllProductsOfVendor(int vendorId) {
        return productsRepository.findProductsByVendorId(vendorId);
    }

    public ProductRespDTO updateProduct(int pid, ProductReqDTO productReqDTO) {
        Products product = mapper.productReqDtoToUpdatedProduct(pid,productReqDTO);
        productsRepository.save(product);
        return mapper.productToProductRespDTO(product);
    }

<<<<<<< HEAD
    public void addSubCategory(int categoryId, String name, String image) {
        Category category = categoryRepository.findById(categoryId).get();
        SubCategory subCategory = new SubCategory();
        subCategory.setCategory(category);
        subCategory.setName(name);
        subCategory.setImage(image);
        subCategoryRepository.save(subCategory);
    }

    public List<SubCategory> getAllSubcategories(int categoryId) {
        return subCategoryRepository.getAllSubCategories(categoryId);
    }
=======
    public List<SubCategory> getAllSubcategories(int categoryId) {
        System.out.println("service"+categoryId);
        List<SubCategory> s = subCategoryRepository.getAllSubcategory(categoryId);
        return s;
    }

    public void addSubcategory(int cid, String name, String image) {
        SubCategory subCategory = new SubCategory();
        subCategory.setImage(image);
        subCategory.setName(name);
        subCategory.setCategory(categoryRepository.findById(cid).get());
        subCategoryRepository.save(subCategory);
    }

>>>>>>> SubCategory_USER

}
