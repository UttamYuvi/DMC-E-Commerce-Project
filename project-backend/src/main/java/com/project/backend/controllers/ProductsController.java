package com.project.backend.controllers;

import com.project.backend.dtos.ProductReqDTO;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsServiceImpl productsService;

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        return  ResponseEntity.ok(productsService.getAllProducts());
    }

    @GetMapping("/{pid}")
    public ResponseEntity<?> getProductById(@PathVariable("pid") int pid) {
        return ResponseEntity.ok(productsService.getProductById(pid));
    }

    @PostMapping
    public ResponseEntity<?> saveProduct(@RequestBody ProductReqDTO productReqDTO) {
        return ResponseEntity.ok(productsService.saveProduct(productReqDTO));
    }

    @PutMapping("/{pid}")
    public ResponseEntity<?> updateProduct(@PathVariable("pid") int pid, @RequestBody ProductReqDTO productReqDTO) {
        return ResponseEntity.ok(productsService.updateProduct(pid,productReqDTO));
    }

    @GetMapping("/category")
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(productsService.getAllCategory());
    }

    @GetMapping("/category/{cid}")
    public ResponseEntity<?> getAllSubCategories(@PathVariable("cid") int cid) {
        return ResponseEntity.ok(productsService.getAllSubCategoryByCategoryId(cid));
    }

    @GetMapping("/subcategory/{scid}")
    public ResponseEntity<?> getAllProductsBySubCategoryId(@PathVariable("scid") int scid) {
        return ResponseEntity.ok(productsService.getAllProductsBySubCategoryId(scid));
    }

    @GetMapping("/vendors/{vid}")
    public ResponseEntity<?> getAllProductsByVendorId(@PathVariable("vid") int vid) {
        return ResponseEntity.ok(productsService.findProductsByVendorId(vid));
    }

//    @PostMapping("/category")
//    public ResponseEntity<?> addNewCategory() {
//
//    }

}
