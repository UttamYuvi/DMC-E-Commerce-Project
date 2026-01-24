package com.project.backend.controllers;

import com.project.backend.entities.Category;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private ProductsServiceImpl productsService;

    @GetMapping("/categories")
    public  ResponseEntity<?> getAllCategories(){
        List<Category> categories = productsService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
