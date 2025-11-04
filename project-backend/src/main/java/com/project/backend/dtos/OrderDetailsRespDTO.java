package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsRespDTO {

    private int orderDetailId;
    private int orderId;
    private int productId;
    private int quantity;
    private double price;
    private double subtotal;

}
