package com.project.backend.controllers;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.ProductReqDTO;
//import com.project.backend.entities.Category;
import com.project.backend.entities.SubCategory;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
=======
import org.springframework.http.HttpStatus;
>>>>>>> SubCategory_USER
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD
import java.io.IOException;
=======
>>>>>>> SubCategory_USER
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsServiceImpl productsService;
    @Autowired
    private EntityMapper mapper;

    @GetMapping //done // user
    public ResponseEntity<?> getAllProducts() {
        return  ResponseEntity.ok(productsService.getAllProducts());
    }

    //done  //user
    @GetMapping("/{pid}")
    public ResponseEntity<?> getProductById(@PathVariable("pid") int pid) {
        return ResponseEntity.ok(productsService.getProductById(pid));
    }

    //done  //vendor
    @PostMapping("/vendor")
    public ResponseEntity<?> saveProduct(@RequestBody ProductReqDTO productReqDTO,Principal principal) {
        int vendorId = mapper.emailToId(principal.getName()).getVendorId() ;
        return ResponseEntity.ok(productsService.saveProduct(productReqDTO,vendorId));
    }

    //done  //vendor
    @GetMapping("/vendor")
    public ResponseEntity<?> getAllProductsOfVendor(Principal principal){
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(productsService.getAllProductsOfVendor(vendorId));

    }

    //done  //vendor
    @PutMapping("/vendor/{pid}")
    public ResponseEntity<?> updateProduct(@PathVariable("pid") int pid, @RequestBody ProductReqDTO productReqDTO, Principal principal) {
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(productsService.updateProduct(pid,productReqDTO));
    }

<<<<<<< HEAD
    //sub category
    @PostMapping(value = "/category", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addNewCategory(@RequestParam("categoryId") int categoryId,
                                            @RequestParam("name") String name,
                                            @RequestParam("image") MultipartFile image) throws IOException {
=======
        @GetMapping("/subcategory/{cid}")
        public ResponseEntity<?> getAllSubcategory(@PathVariable("cid") int cid) {
        System.out.println("category api called"+cid);
        return ResponseEntity.ok(productsService.getAllSubcategories(cid));
    }

    @PostMapping(value = "/subcategories", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addSubCategory(@RequestParam("categoryId") int categoryId, @RequestParam("name") String name, @RequestParam("image") MultipartFile image) {
        try {
            System.out.println("api called");
            String uploadDir = "uploads/subcategories/mens";
            Files.createDirectories(Paths.get(uploadDir));
            String fileName = image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, image.getBytes());
            productsService.addSubcategory(categoryId, name, fileName);

            return ResponseEntity.ok("SubCategory added successfully");

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while creating subcategory");
        }
    }


>>>>>>> SubCategory_USER

//        int categoryId = subCategoryReqDTO.getCategoryId();
//        String name = subCategoryReqDTO.getName();
        System.out.println(name);

        String uploadDir = "uploads/subcategories/";
        Files.createDirectories(Paths.get(uploadDir));

        String fileName = image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.write(filePath, image.getBytes());
        productsService.addSubCategory(categoryId,name,fileName);
        return ResponseEntity.ok("Sub Category added");
    }

    @GetMapping("/category")
    public ResponseEntity<?> getAllSubCategory(@RequestParam("categoryId") int categoryId) {
        return ResponseEntity.ok(productsService.getAllSubcategories(categoryId));
    }
}
