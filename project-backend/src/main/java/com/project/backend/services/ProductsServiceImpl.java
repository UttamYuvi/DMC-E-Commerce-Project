package com.project.backend.services;

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
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
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


    // CATEGORYYYYY

    public Category addNewCategory(String name, String image, Principal principal) {
        Category category = new Category();
        category.setName(name);
        category.setImage(image);
        category.setVendor(mapper.emailToId(principal.getName()));
        System.out.println(mapper.emailToId(principal.getName()).getVendorId());
        return categoryRepository.save(category);
    }
    public List<CategoryReqRespDTO> getAllCategory(int vendorId) {
        return mapper.categoriesToCategoriesRespDTO(categoryRepository.findAllByVendorId(vendorId));
    }
    @Transactional
    public int updateCategory(int categoryId, String name, String image) {
        return categoryRepository.updateCategory(name, image,categoryId);
    }
    @Transactional
    public Category deleteCategory (int vendorId,int categoryId) {
        Category category = categoryRepository.findById(categoryId).get();
        System.out.println(categoryRepository.deleteByVendorIdAndCategoryId(vendorId,category.getCategoryId()));
        return category;
    }









    public List<SubCategoryRespDTO> getAllSubCategoryByCategoryId(int cid) {
        List<SubCategory> subCategories = subCategoryRepository.getAllSubCategoryByCategoryId(cid);
        return mapper.subCategoriesToSubCategoriesRespDTO(subCategories);
    }

    public List<ProductRespDTO> findProductsByVendorEmail(String email) {
        List<Products> products = productsRepository.findProductsByVendorEmail(email);
        List<ProductRespDTO> productRespDTOList = new ArrayList<>();
        for(Products product : products) {
            productRespDTOList.add(mapper.productToProductRespDTO(product));
        }
        return productRespDTOList;
    }

}
