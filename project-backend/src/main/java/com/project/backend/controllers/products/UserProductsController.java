package com.project.backend.controllers.products;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class UserProductsController {

    @Autowired
    private ProductsServiceImpl productsService;
    @Autowired
    private EntityMapper mapper;
    private final String UPLOAD_DIR = "uploads/products/";


    //done // user
    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        return  ResponseEntity.ok(productsService.getAllProducts());
    }

    //done  //user
    @GetMapping("/{pid}")
    public ResponseEntity<?> getProductById(@PathVariable("pid") int pid) {
        return ResponseEntity.ok(productsService.getProductById(pid));
    }

    //done  //user
    @GetMapping("/{cid}/{scid}")
    public ResponseEntity<?> getProductByCatAndSubcat(@PathVariable("cid") int cid, @PathVariable("scid") int scid) {
        System.out.println("call");
        return ResponseEntity.ok(productsService.getProductByCatAndSubcat(cid,scid));
    }

    //done  //user
    @GetMapping("/subcategory/{cid}")
    public ResponseEntity<?> getAllSubcategory(@PathVariable("cid") int cid) {
        System.out.println("category api called"+cid);
        return ResponseEntity.ok(productsService.getAllSubcategories(cid));
    }
}
