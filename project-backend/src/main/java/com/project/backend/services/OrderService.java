package com.project.backend.services;


import com.project.backend.dtos.OrderDetailsReqDTO;
import com.project.backend.dtos.OrderDetailsRespDTO;
import com.project.backend.dtos.OrderReqDTO;
import com.project.backend.dtos.OrderRespDTO;
import com.project.backend.entities.Order;
import com.project.backend.entities.User;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderService {


    //done  //user
    OrderRespDTO findOrderByOrderIdAndUserId(int orderId, int userId);

    //done  //user
    OrderRespDTO placeOrder(User user, OrderReqDTO orderReqDTO);

    //done  //user
    List<OrderRespDTO> findOrdersByUserId(int userId);

    String cancelOrder(int orderId);

    List<OrderDetailsRespDTO> findOrderDetailsByOrderId(int orderId);

    OrderDetailsRespDTO findOrderDetailByOrderDetailId(int orderDetailId);

}
