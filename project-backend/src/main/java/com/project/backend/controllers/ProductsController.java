package com.project.backend.controllers;

import com.project.backend.dtos.ProductReqDTO;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsServiceImpl productsService;

    @GetMapping("/user")
    public ResponseEntity<?> getAllProducts() {
        return  ResponseEntity.ok(productsService.getAllProducts());
    }

    @GetMapping("/user/{pid}")
    public ResponseEntity<?> getProductById(@PathVariable("pid") int pid) {
        return ResponseEntity.ok(productsService.getProductById(pid));
    }

    @PostMapping("/vendor")
    public ResponseEntity<?> saveProduct(@RequestBody ProductReqDTO productReqDTO) {
        return ResponseEntity.ok(productsService.saveProduct(productReqDTO));
    }

    @PutMapping("/vendor/{pid}")
    public ResponseEntity<?> updateProduct(@PathVariable("pid") int pid, @RequestBody ProductReqDTO productReqDTO) {
        return ResponseEntity.ok(productsService.updateProduct(pid,productReqDTO));
    }

    @GetMapping("/user/category")
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(productsService.getAllCategory());
    }

    @GetMapping("/user/category/{cid}")
    public ResponseEntity<?> getAllSubCategories(@PathVariable("cid") int cid) {
        return ResponseEntity.ok(productsService.getAllSubCategoryByCategoryId(cid));
    }

    @GetMapping("/user/subcategory/{scid}")
    public ResponseEntity<?> getAllProductsBySubCategoryId(@PathVariable("scid") int scid) {
        return ResponseEntity.ok(productsService.getAllProductsBySubCategoryId(scid));
    }

    @GetMapping("/vendor")
    public ResponseEntity<?> getAllProductsByVendorId(Principal principal) {
        String email = principal.getName();
        return ResponseEntity.ok(productsService.findProductsByVendorEmail(email));
    }



}
