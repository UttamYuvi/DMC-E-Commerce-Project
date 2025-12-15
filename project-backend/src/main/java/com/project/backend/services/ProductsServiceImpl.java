package com.project.backend.services;

import com.project.backend.repository.ProductsRepository;
import com.project.backend.dtos.*;
import com.project.backend.entities.Products;
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
        return productsRepository.save(mapper.productReqToProducts(productReqDTO,vendorId));
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


}
