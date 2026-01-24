package com.project.backend.controllers.User;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.OrderReqDTO;
import com.project.backend.entities.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EntityMapper mapper;
//
//    //done  //user
//    @GetMapping
//    public ResponseEntity<?> findAllOrders(Principal principal) {
//        int userId = mapper.userEmailToId(principal.getName()).getUserId();
//        return ResponseEntity.ok(orderService.findOrdersByUserId(userId));
//    }
//
//    //done  //user
//    @GetMapping("/{oid}")
//    public ResponseEntity<?> findOrderById(@PathVariable("oid") int orderId,Principal principal) {
//        int userId = mapper.userEmailToId(principal.getName()).getUserId();
//        return ResponseEntity.ok(orderService.findOrderByOrderIdAndUserId(orderId,userId));
//    }
//
//    //done  //user
//    @GetMapping("/cancel/{oid}")
//    public ResponseEntity<?> cancelOrderById(@PathVariable("oid") int orderId,Principal principal) {


    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderReqDTO orderReqDTO, Principal principal) {
        User user = mapper.userEmailToId(principal.getName());
        orderService.placeOrder(user,orderReqDTO);
        return ResponseEntity.ok("Order Placed");
    }
//
//    @GetMapping("/details/{orderId}")
//    public ResponseEntity<?> findOrderDetailsByOrderId(@PathVariable("orderId") int orderId) {
//        return ResponseEntity.ok(orderService.findOrderDetailsByOrderId(orderId));
//    }
//
//    @GetMapping("/singledetail/{orderDetailsId}")
//    public ResponseEntity<?> findOrderDetailByOrderDetailId(@PathVariable("orderDetailsId") int orderDetailsId) {
//        return ResponseEntity.ok(orderService.findOrderDetailByOrderDetailId(orderDetailsId));
//    }
//
//
}
