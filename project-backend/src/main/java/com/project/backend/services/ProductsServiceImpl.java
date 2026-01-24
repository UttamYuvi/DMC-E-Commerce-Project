package com.project.backend.services;

import com.project.backend.entities.Category;
import com.project.backend.entities.SubCategory;
import com.project.backend.entities.Vendor;
import com.project.backend.repository.CategoryRepository;
import com.project.backend.repository.ProductsRepository;
import com.project.backend.dtos.*;
import com.project.backend.entities.Products;
import com.project.backend.repository.SubCategoryRepository;
import com.project.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    //done  -  user
    public Page<ProductRespDTO> getAllProducts(int page, int size) {
        Page<Products> productPage = productsRepository.findAll(
                PageRequest.of(page, size, Sort.by("createdAt").descending())
        );
        return productPage.map(mapper::productToProductRespDTO);
    }


    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    //done  //user
    public ProductRespDTO getProductById(int id) {
        return mapper.productToProductRespDTO(productsRepository.findById(id).get());
    }

    //done  //user
    public List<Products> getProductByCatAndSubcat(int categoryId, int subCategoryId) {
        return productsRepository.findByCategory_CategoryIdAndSubCategory_SubCategoryId(categoryId,subCategoryId);
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
