package com.project.backend.controllers.Vendor;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.Resp;
import com.project.backend.dtos.StatusDTO;
import com.project.backend.repository.UserRepository;
import com.project.backend.services.OrderService;
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

    @GetMapping //final
    public ResponseEntity<?> findAllOrderOfVendors(Principal principal) {
        return ResponseEntity.ok(orderService.findAllOrderByVendor(principal));
    }
    @GetMapping("/count") //final
    public ResponseEntity<?> getVendorAllOrderCount(Principal principal) {
        return ResponseEntity.ok(orderService.getVendorAllOrderCount(principal));
    }
    @PostMapping("/byStatus") //final
    public ResponseEntity<?> getAllOrderByStatus(@RequestBody StatusDTO statusDTO, Principal principal) {
        return ResponseEntity.ok(orderService.getAllOrderByStatus(statusDTO.getStatus(),principal));
    }
    @GetMapping("/sales")
    public ResponseEntity<?> getSalesAndProfit(Principal principal) {
        int vendorId = mapper.emailToId(principal.getName()).getVendorId();
        return ResponseEntity.ok(orderService.getProductWiseSales(vendorId));
    }


}
