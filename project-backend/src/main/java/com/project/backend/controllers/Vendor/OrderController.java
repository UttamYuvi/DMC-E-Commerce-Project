package com.project.backend.controllers.Vendor;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.Resp;
import com.project.backend.dtos.StatusDTO;
import com.project.backend.repository.UserRepository;
import com.project.backend.services.OrderService;
import com.project.backend.services.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EntityMapper mapper;
    @Autowired
    private VendorService vendorService;

    @GetMapping // get all recent orders os vendor
    public ResponseEntity<?> findAllOrderOfVendors(Principal principal) {
        System.out.println("findAllOrderOfVendors");
        return ResponseEntity.ok(orderService.findAllOrderByVendor(principal));
    }
    @GetMapping("/count") // give no of order of vendor
    public ResponseEntity<?> getVendorAllOrderCount(Principal principal) {
        System.out.println("getVendorAllOrderCount");
        return ResponseEntity.ok(orderService.getVendorAllOrderCount(principal));
    }
    @PostMapping("/byStatus") // get all orders of vendor by status
    public ResponseEntity<?> getAllOrderByStatus(@RequestBody StatusDTO statusDTO, Principal principal) {
        System.out.println("getAllOrderByStatus");
        return ResponseEntity.ok(orderService.getAllOrderByStatus(statusDTO.getStatus(),principal));
    }
    @PostMapping("/status/{oid}") // change order status
    public ResponseEntity<?> setOrderStatus(@PathVariable("oid") int oid, @RequestBody StatusDTO statusDTO) {
        System.out.println("setOrderStatus");
        return ResponseEntity.ok(vendorService.setOrderStatus(oid,statusDTO.getStatus()));
    }


}
