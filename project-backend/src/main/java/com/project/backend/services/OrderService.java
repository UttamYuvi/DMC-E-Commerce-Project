package com.project.backend.services;


import com.project.backend.dtos.OrderDetailsReqDTO;
import com.project.backend.dtos.OrderDetailsRespDTO;
import com.project.backend.dtos.OrderReqDTO;
import com.project.backend.dtos.OrderRespDTO;
import com.project.backend.entities.User;

import java.util.List;

public interface OrderService {

    List<OrderRespDTO> findAllOrders();

    OrderRespDTO findOrderById(int orderId);

    OrderRespDTO placeOrder(User user, OrderReqDTO orderReqDTO);

    List<OrderDetailsRespDTO> findOrderDetailsByOrderId(int orderId);

    OrderDetailsRespDTO findOrderDetailByOrderDetailId(int orderDetailId);

}
