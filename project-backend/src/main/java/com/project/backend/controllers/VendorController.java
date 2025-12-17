package com.project.backend.controllers;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.StatusDTO;
import com.project.backend.services.VendorService;
import com.project.backend.services.VendorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/vendors")
public class VendorController {

    @Autowired
    private VendorServiceImpl vendorService;
    @Autowired
    private EntityMapper mapper;


    @GetMapping
    public ResponseEntity<?> getAllVendors() {
        return ResponseEntity.ok(vendorService.getAllVendors());
    }

    @GetMapping("/{vid}")
    public ResponseEntity<?> getVendorById(@PathVariable("vid") int vid) {
        return ResponseEntity.ok(vendorService.getVendorById(vid));
    }

    //done
    @GetMapping("/delivered")
    public ResponseEntity<?> getAllDeliveredProductsOfVendor(Principal principal) {
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(vendorService.getAllDeliveredProductsOfVendor(vendorId));
    }

    //done
    @PostMapping("/status/{oid}")
    public ResponseEntity<?> setOrderStatus(@PathVariable("oid") int oid, @RequestBody StatusDTO statusDTO) {
        return ResponseEntity.ok(vendorService.setOrderStatus(oid,statusDTO.getStatus()));
    }

    @GetMapping("/sales")
    public ResponseEntity<?> getTotalSalesOfVendor(Principal principal) {
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(vendorService.getTotalSalesOfVendor(vendorId));
    }
//    @GetMapping("/{vid}/user")
//    public ResponseEntity<?> getAllUsersByVendorId(@PathVariable("vid") int vid) {
//        return ResponseEntity.ok(vendorService.getAllUsersByVendorId(vid));
//    }
}
