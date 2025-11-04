package com.project.backend.services;

import com.project.backend.entities.Vendor;
import com.project.backend.repository.CategoryRepository;
import com.project.backend.repository.ProductsRepository;
import com.project.backend.repository.SubCategoryRepository;
import com.project.backend.dtos.*;
import com.project.backend.entities.Category;
import com.project.backend.entities.Products;
import com.project.backend.entities.SubCategory;
import com.project.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private VendorRepository vendorRepository;

    public List<ProductRespDTO> getAllProducts() {
        List<ProductRespDTO> productRespDTOS = new ArrayList<>();
        for(Products product : productsRepository.findAll()) {
            productRespDTOS.add(mapper.productToProductRespDTO(product));
        }
        return productRespDTOS;
    }

    public ProductRespDTO getProductById(int id) {
        return mapper.productToProductRespDTO(productsRepository.findById(id).get());
    }

    public Products saveProduct(ProductReqDTO productReqDTO) {
        return productsRepository.save(mapper.productReqToProducts(productReqDTO));
    }

    public ProductRespDTO updateProduct(int pid, ProductReqDTO productReqDTO) {
        Products product = mapper.productReqDtoToUpdatedProduct(productReqDTO);
        product.setProductId(pid);
        productsRepository.save(product);
        return mapper.productToProductRespDTO(product);
    }

    public List<ProductRespDTO> getAllProductsBySubCategoryId(int scid) {
        List<Products> products = productsRepository.getAllProductsBySubCategoryId(scid);
        List<ProductRespDTO> productRespDTOList = new ArrayList<>();
        for(Products product : products) {
            productRespDTOList.add(mapper.productToProductRespDTO(product));
        }
        return productRespDTOList;
    }

    public List<CategoryReqRespDTO> getAllCategory() {
        List<Category> categories = categoryRepository.findAll();
        return mapper.categoriesToCategoriesRespDTO(categories);
    }

    public List<SubCategoryRespDTO> getAllSubCategoryByCategoryId(int cid) {
        List<SubCategory> subCategories = subCategoryRepository.getAllSubCategoryByCategoryId(cid);
        return mapper.subCategoriesToSubCategoriesRespDTO(subCategories);
    }

    public List<ProductRespDTO> findProductsByVendorId(int vid) {
        List<Products> products = productsRepository.findProductsByVendorId(vid);
        List<ProductRespDTO> productRespDTOList = new ArrayList<>();
        for(Products product : products) {
            productRespDTOList.add(mapper.productToProductRespDTO(product));
        }
        return productRespDTOList;
    }

//    public CategoryReqRespDTO addNewCategory(CategoryReqRespDTO categoryReqRespDTO) {
//
//    }
}
