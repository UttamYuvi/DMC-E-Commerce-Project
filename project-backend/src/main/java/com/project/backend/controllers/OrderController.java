package com.project.backend.controllers;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.OrderDetailsReqDTO;
import com.project.backend.dtos.OrderReqDTO;
import com.project.backend.dtos.OrderRespDTO;
import com.project.backend.entities.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EntityMapper mapper;

    @GetMapping
    public ResponseEntity<?> findAllOrders() {
        return ResponseEntity.ok(orderService.findAllOrders());
    }

    @GetMapping("/{oid}")
    public ResponseEntity<?> findOrderById(@PathVariable("oid") int orderId) {
        return ResponseEntity.ok(orderService.findOrderById(orderId));
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderReqDTO orderReqDTO, Principal principal) {
        User user = mapper.userEmailToId(principal.getName());
        orderService.placeOrder(user,orderReqDTO);
        return ResponseEntity.ok("Order Placed");
    }

    @GetMapping("/details/{orderId}")
    public ResponseEntity<?> findOrderDetailsByOrderId(@PathVariable("orderId") int orderId) {
        return ResponseEntity.ok(orderService.findOrderDetailsByOrderId(orderId));
    }

    @GetMapping("/singledetail/{orderDetailsId}")
    public ResponseEntity<?> findOrderDetailByOrderDetailId(@PathVariable("orderDetailsId") int orderDetailsId) {
        return ResponseEntity.ok(orderService.findOrderDetailByOrderDetailId(orderDetailsId));
    }


}
