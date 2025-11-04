package com.project.backend.controllers;

import com.project.backend.services.VendorService;
import com.project.backend.services.VendorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vendors")
public class VendorController {

    @Autowired
    private VendorServiceImpl vendorService;

    @GetMapping
    public ResponseEntity<?> getAllVendors() {
        return ResponseEntity.ok(vendorService.getAllVendors());
    }

    @GetMapping("/{vid}")
    public ResponseEntity<?> getVendorById(@PathVariable("vid") int vid) {
        return ResponseEntity.ok(vendorService.getVendorById(vid));
    }

//    @GetMapping("/{vid}/user")
//    public ResponseEntity<?> getAllUsersByVendorId(@PathVariable("vid") int vid) {
//        return ResponseEntity.ok(vendorService.getAllUsersByVendorId(vid));
//    }
}
