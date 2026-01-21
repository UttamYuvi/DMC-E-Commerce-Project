package com.project.backend.controllers.products;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.ProductRespDTO;
import com.project.backend.dtos.Resp;
import com.project.backend.entities.Products;
import com.project.backend.entities.ResourceNotFoundException;
import com.project.backend.services.ProductsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Resp<List<ProductRespDTO>> getAllProducts() {
        return  Resp.success(productsService.getAllProducts());
    }

    //done  //user
    @GetMapping("/{pid}")
    public ResponseEntity<Resp<ProductRespDTO>> getProductById(@PathVariable("pid") int pid) {
       try {
           ProductRespDTO productRespDTO =  productsService.getProductById(pid);
           return ResponseEntity.ok(Resp.success(productRespDTO));
       } catch (ResourceNotFoundException e) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Resp.error(e.getMessage()));
       }
    }

    //done  //user
    @GetMapping("/{cid}/{scid}")
    public ResponseEntity<Resp<List<ProductRespDTO>>> getProductByCatAndSubcat(@PathVariable("cid") int cid, @PathVariable("scid") int scid) {
        try{
            List<ProductRespDTO> productRespDTOS = productsService.getProductByCatAndSubcat(cid,scid);
            return ResponseEntity.ok(Resp.success(productRespDTOS));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Resp.error(e.getMessage()));
        }
    }

    //done  //user
    @GetMapping("/subcategory/{cid}")
    public ResponseEntity<?> getAllSubcategory(@PathVariable("cid") int cid) {
        System.out.println("category api called"+cid);
        return ResponseEntity.ok(productsService.getAllSubcategories(cid));
    }
}
