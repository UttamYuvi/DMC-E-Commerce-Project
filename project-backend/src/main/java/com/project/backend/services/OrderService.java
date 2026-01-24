package com.project.backend.services;


import com.project.backend.dtos.*;
import com.project.backend.entities.Order;
import com.project.backend.entities.Products;
import com.project.backend.entities.User;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.security.Principal;
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

    List<VendorOrderRespDTO> findAllOrderByVendor(Principal principal);

    int getVendorAllOrderCount(Principal principal);

    List<VendorOrderRespDTO> getAllOrderByStatus(String status, Principal principal);

    List<ProductSalesRespDTO> getProductWiseSales(int vendorId);

}
