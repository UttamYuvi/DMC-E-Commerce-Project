package com.project.backend.dtos;

import java.util.List;

import com.project.backend.entities.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRespDTO {

    private int orderId;
    private double totalAmount;
    private String paymentStatus;
    private String orderStatus;
    private Address deliveryAddress;
    private List<OrderDetailsRespDTO> orderDetails;

}
