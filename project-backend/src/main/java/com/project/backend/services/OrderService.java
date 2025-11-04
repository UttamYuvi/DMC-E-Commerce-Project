package com.project.backend.services;


import com.project.backend.dtos.OrderDetailsReqDTO;
import com.project.backend.dtos.OrderDetailsRespDTO;
import com.project.backend.dtos.OrderRespDTO;

import java.util.List;

public interface OrderService {

    List<OrderRespDTO> findAllOrders();

    OrderRespDTO findOrderById(int orderId);

    OrderRespDTO placeOrder(int userId, List<OrderDetailsReqDTO> orderDetailsReqDTOS);

    List<OrderDetailsRespDTO> findOrderDetailsByOrderId(int orderId);

    OrderDetailsRespDTO findOrderDetailByOrderDetailId(int orderDetailId);

}
