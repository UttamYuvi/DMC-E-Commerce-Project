package com.project.backend.controllers;

import com.project.backend.dtos.CategoryReqRespDTO;
import com.project.backend.dtos.EntityMapper;
import com.project.backend.repository.VendorRepository;
import com.project.backend.services.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;

@RequestMapping("/category")
@RestController
public class CategoryController {

    @Autowired
    private ProductsService productsService;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private EntityMapper mapper;

    @GetMapping("/vendor")
    public ResponseEntity<?> getAllCategories(Principal principal) {
        System.out.println("Getting the Categories ");
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(productsService.getAllCategory(vendorId));
    }

    @PostMapping(value="/vendor/update",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCategory(@RequestParam("categoryId") int categoryId,
                                            @RequestParam("name") String name,
                                            @RequestParam("image") MultipartFile image) throws IOException {
        System.out.println("in update ");
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) Files.createDirectories(uploadDir);
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        System.out.println("filename "+fileName);
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);
        System.out.println("hii");
        return ResponseEntity.ok(productsService.updateCategory(categoryId,name, fileName));
    }

    @PostMapping(value="/vendor", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addCategory(@RequestParam("name") String name,
                                         @RequestParam("image") MultipartFile image, Principal principal) throws IOException {
        System.out.println("Category Name: " + name);
        System.out.println("Image File: " + image.getOriginalFilename());
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) Files.createDirectories(uploadDir);
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);
        productsService.addNewCategory(name, fileName, principal);
        return ResponseEntity.ok("Category Added");
    }

    @PostMapping("/vendor/delete")
    public ResponseEntity<?> deleteCategory(@RequestBody CategoryReqRespDTO categoryReqRespDTO, Principal principal) {
        System.out.println(categoryReqRespDTO);
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        System.out.println("v : "+vendorId);
        System.out.println("c: "+categoryReqRespDTO.getCategoryId());
        return ResponseEntity.ok(productsService.deleteCategory(vendorId,categoryReqRespDTO.getCategoryId()));
    }
}
