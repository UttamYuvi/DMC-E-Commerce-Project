package com.project.backend.controllers;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.ProductReqDTO;
//import com.project.backend.entities.Category;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

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
        @GetMapping("/subcategory/{cid}")
        public ResponseEntity<?> getAllSubcategory(@PathVariable("cid") int cid) {
        System.out.println("category api called"+cid);
        return ResponseEntity.ok(productsService.getAllSubcategories(cid));
    }

}
