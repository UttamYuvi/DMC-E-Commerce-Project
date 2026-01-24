package com.project.backend.controllers.Vendor;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.StatusDTO;
import com.project.backend.dtos.UpdateVendorReqDTO;
import com.project.backend.dtos.VendorRequestDTO;
import com.project.backend.services.OrderService;
import com.project.backend.services.VendorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/vendor")
public class VendorController {

    @Autowired
    private VendorServiceImpl vendorService;
    @Autowired
    private EntityMapper mapper;
    @Autowired
    private OrderService orderService;


    @GetMapping
    public ResponseEntity<?> getVendorById(Principal principal) {
        int vid = mapper.emailToId(principal.getName()).getVendorId();
        System.out.println("getVendorById");
        return ResponseEntity.ok(vendorService.getVendorById(vid));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateVendor(@RequestBody UpdateVendorReqDTO updateVendorReqDTO, Principal principal) {
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(vendorService.updateVendor(updateVendorReqDTO,vendorId));
    }

    @GetMapping("/sales") // get total sales of vendor
    public ResponseEntity<?> getTotalSalesOfVendor(Principal principal) {
        System.out.println("getTotalSalesOfVendor");
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(vendorService.getTotalSalesOfVendor(vendorId));
    }

    @GetMapping("/salesandprofit") // get vendor sales with profit
    public ResponseEntity<?> getSalesAndProfit(Principal principal) {
        System.out.println("getSalesAndProfit");
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(orderService.getProductWiseSales(vendorId));
    }







}
