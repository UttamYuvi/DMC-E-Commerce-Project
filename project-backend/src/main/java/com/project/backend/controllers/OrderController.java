package com.project.backend.controllers;

import com.project.backend.dtos.OrderDetailsReqDTO;
import com.project.backend.dtos.OrderRespDTO;
import com.project.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<?> findAllOrders() {
        return ResponseEntity.ok(orderService.findAllOrders());
    }

    @GetMapping("/{oid}")
    public ResponseEntity<?> findOrderById(@PathVariable("oid") int orderId) {
        return ResponseEntity.ok(orderService.findOrderById(orderId));
    }

    @PostMapping("/{uid}")
    public ResponseEntity<?> placeOrder(@PathVariable("uid") int uid, @RequestBody List<OrderDetailsReqDTO> orderDetailsReqDTOs) {
        return ResponseEntity.ok(orderService.placeOrder(uid,orderDetailsReqDTOs));
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
