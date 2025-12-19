package com.project.backend.controllers;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.ProductReqDTO;
//import com.project.backend.entities.Category;
import com.project.backend.dtos.ProductRespDTO;
import com.project.backend.entities.Products;
import com.project.backend.entities.Vendor;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsServiceImpl productsService;
    @Autowired
    private EntityMapper mapper;
    private final String UPLOAD_DIR = "uploads/products/";

    @GetMapping //done // user
    public ResponseEntity<?> getAllProducts() {
        return  ResponseEntity.ok(productsService.getAllProducts());
    }

    //done  //user
    @GetMapping("/{pid}")
    public ResponseEntity<?> getProductById(@PathVariable("pid") int pid) {
        return ResponseEntity.ok(productsService.getProductById(pid));
    }
    @GetMapping("/{cid}/{scid}")
    public ResponseEntity<?> getProductByCatAndSubcat(@PathVariable("cid") int cid, @PathVariable("scid") int scid) {
        return ResponseEntity.ok(productsService.getProductById(cid));
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(
            Principal principal, @RequestParam int categoryId, @RequestParam int subCategoryId, @RequestParam String name, @RequestParam String description,
            @RequestParam double price, @RequestParam int stock, @RequestParam String status, @RequestParam("images") MultipartFile[] images
    ) throws IOException {

        System.out.println(status);
        Files.createDirectories(Paths.get(UPLOAD_DIR));
        List<String> imagePaths = new ArrayList<>();

        for (MultipartFile file : images) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.write(filePath, file.getBytes());
            imagePaths.add(fileName);
        }
        String imagesString = String.join(",", imagePaths);
        Vendor vendor = mapper.emailToId(principal.getName());
        ProductRespDTO productRespDTO = productsService.addProduct(vendor, categoryId, subCategoryId,name, description, stock, status, price, imagesString);
        return ResponseEntity.ok(productRespDTO);
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
        @GetMapping("/subcategory/{cid}")
        public ResponseEntity<?> getAllSubcategory(@PathVariable("cid") int cid) {
        System.out.println("category api called"+cid);
        return ResponseEntity.ok(productsService.getAllSubcategories(cid));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") int id){
        System.out.println(id);
        productsService.deleteProduct(id);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProducts(@RequestBody ProductReqDTO productReqDTO) {
        return ResponseEntity.ok(productsService.updateProduct(productReqDTO));
    }


}
