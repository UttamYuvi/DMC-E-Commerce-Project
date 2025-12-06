package com.project.backend.controllers;

import com.project.backend.dtos.CategoryRequest;
import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.ProductReqDTO;
import com.project.backend.entities.Category;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Base64;

//@CrossOrigin(originPatterns = {"http://localhost:5173","http://127.0.0.1:5173"})
//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsServiceImpl productsService;
    @Autowired
    private EntityMapper mapper;

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

//    @GetMapping("/user/category")
//    public ResponseEntity<?> getAllUserCategories() {
//        return ResponseEntity.ok(productsService.getAllCategory());
//    }
//    @GetMapping("/vendor/category")
//    public ResponseEntity<?> getAllCategories() {
//        return ResponseEntity.ok(productsService.getAllCategory());
//    }

    @GetMapping("/user/category/{cid}")
    public ResponseEntity<?> getAllSubCategories(@PathVariable("cid") int cid) {
        return ResponseEntity.ok(productsService.getAllSubCategoryByCategoryId(cid));
    }

    @GetMapping("/user/subcategory/{scid}")
    public ResponseEntity<?> getAllProductsBySubCategoryId(@PathVariable("scid") int scid) {
        return ResponseEntity.ok(productsService.getAllProductsBySubCategoryId(scid));
    }

//    @GetMapping("/vendor")
//    public ResponseEntity<?> getAllProductsByVendorId(Principal principal) {
//        String email = principal.getName();
//        return ResponseEntity.ok(productsService.findProductsByVendorEmail(email));
//    }
//
//
//    @PostMapping(value="/vendor/category", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> addCategory(
//            @RequestParam("name") String name,
//            @RequestParam("image") MultipartFile image,
//            Principal principal
//    ) throws IOException {
//        System.out.println("Category Name: " + name);
//        System.out.println("Image File: " + image.getOriginalFilename());
//
//        // Ensure uploads directory exists
//        Path uploadDir = Paths.get("uploads");
//        if (!Files.exists(uploadDir)) {
//            Files.createDirectories(uploadDir);
//        }
//
//        // Save the file
//        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
//        Path filePath = uploadDir.resolve(fileName);
//
//        Files.copy(image.getInputStream(), filePath);
//
//        productsService.addNewCategory(name, fileName, principal);
//
//        return ResponseEntity.ok("Category Added");
//
//    }



}
