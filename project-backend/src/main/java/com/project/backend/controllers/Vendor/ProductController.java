package com.project.backend.controllers.Vendor;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.ProductReqDTO;
import com.project.backend.dtos.ProductRespDTO;
import com.project.backend.entities.Vendor;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductsServiceImpl productsService;
    @Autowired
    private EntityMapper mapper;
    private final String UPLOAD_DIR = "uploads/products/";


    //done
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(
            Principal principal, @RequestParam int categoryId, @RequestParam int subCategoryId, @RequestParam String name, @RequestParam String description,
            @RequestParam double price, @RequestParam int stock, @RequestParam String status, @RequestParam("images") MultipartFile[] images
    ) throws IOException {
        System.out.println("addProduct");
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

    //done
    @GetMapping
    public ResponseEntity<?> getAllProductsOfVendor(Principal principal){
        System.out.println("getAllProductsOfVendor");
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(productsService.getAllProductsOfVendor(vendorId));
    }
    @GetMapping("/count")
    public ResponseEntity<?> getAllProductsCount(Principal principal) {
        System.out.println("getAllProductsCount");
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        System.out.println(vendorId);
        return ResponseEntity.ok(productsService.getAllProductsOfVendor(vendorId).size());
    }

    //done
    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id") int id){
        System.out.println("deleteProduct");
        productsService.deleteProduct(id);
    }

    //done
    @PostMapping("/update")
    public ResponseEntity<?> updateProducts(@RequestBody ProductReqDTO productReqDTO) {
        System.out.println("updateProducts");
        return ResponseEntity.ok(productsService.updateProduct(productReqDTO));
    }
}
