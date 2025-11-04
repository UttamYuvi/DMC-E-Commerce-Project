package com.project.backend.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRespDTO {

    private int orderId;
    private int userId;
    private double totalAmount;
    private String paymentStatus;
    private String orderStatus;
    private String deliveryAddress;
    private List<OrderDetailsRespDTO> orderDetails;

}
