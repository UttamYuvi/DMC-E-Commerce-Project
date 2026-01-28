package com.project.backend.services;

import com.project.backend.entities.*;
import com.project.backend.repository.CategoryRepository;
import com.project.backend.repository.ProductsRepository;
import com.project.backend.dtos.*;
import com.project.backend.repository.SubCategoryRepository;
import com.project.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    //done  -  user


    public Page<ProductRespDTO> getAllProducts(int page, int size) {

        Page<Products> productPage =
                productsRepository.findByVendor_Status(
                        "active",
                        PageRequest.of(page, size, Sort.by("createdAt").descending())
                );

        return productPage.map(mapper::productToProductRespDTO);
    }



    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    //done  //user
    public ProductRespDTO getProductById(int id) throws ResourceNotFoundException {
        Optional<Products> optional = productsRepository.findById(id);
        if (optional.isPresent()) {
            return mapper.productToProductRespDTO(optional.get());
        } else {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
    }

    //done  //user
    public List<ProductRespDTO> getProductByCatAndSubcat(int categoryId, int subCategoryId) throws ResourceNotFoundException {
        List<Products> products = productsRepository.findByCategory_CategoryIdAndSubCategory_SubCategoryId(categoryId, subCategoryId);
        if(products.size() != 0) {
            List<ProductRespDTO> productRespDTOS = new ArrayList<>();
            for(Products product : products) {
                productRespDTOS.add(mapper.productToProductRespDTO(product));
            }
            return productRespDTOS;
        }
        throw new ResourceNotFoundException("Products not found with given categoryId: "+categoryId+" and subCategoryId: "+subCategoryId);
    }

    //done  //user
    public List<SubCategoryByCategoryRespDTO> getAllSubcategories(int categoryId) {
        List<SubCategory> subCategories = subCategoryRepository.getSubCategoriesByCategoryId(categoryId);
        return mapper.getSubCatByCat(subCategories, categoryId);

    }

    public List<SubCategoryWithCategoryDTO> getAvailableSubcategories() {
        List<SubCategoryWithCategoryDTO> s = subCategoryRepository.findAvailableSubCategories();
        System.out.println(s);
        return s;
    }

    // --------------------------------------------------------------------------------------------


    //done  //vendor
    public ProductRespDTO addProduct(Vendor vendor, int categoryId, int subCategoryId, String name,
                           String description, int stock, String status, double price, String images) {
        Products products = new Products();
        products.setCategory(categoryRepository.findById(categoryId).get());
        products.setSubCategory(subCategoryRepository.findById(subCategoryId).get());
        products.setVendor(vendor);
        products.setName(name);
        products.setDescription(description);
        products.setStatus(status);
        products.setStock(stock);
        products.setPrice(price);
        products.setImages(images);
        productsRepository.save(products);
        return mapper.productToProductRespDTO(products);
    }

    //done  //vendor
    @Override
    public List<ProductRespDTO> getAllProductsOfVendor(int vendorId) {
        List<Products> products = productsRepository.findProductsByVendorId(vendorId);
        List<ProductRespDTO> productRespDTOS = new ArrayList<>();
        for ( Products product: products)
            productRespDTOS.add(mapper.productToProductRespDTO(product));
        return productRespDTOS;
    }

    //done  //vendor
    @Override
    public void deleteProduct(int id) {
        productsRepository.deleteById(id);

    }

    //done  //vendor
    public ProductRespDTO updateProduct(ProductReqDTO productReqDTO) {
        Products save = productsRepository.save(mapper.productReqToProducts(productReqDTO));
        return mapper.productToProductRespDTO(save);
    }



}
