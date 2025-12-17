package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendorDeliveredProductDTO {

    private int orderId;
    private int productId;
    private String name;
    private String description;
    private int quantity;
    private double price;
    private double totalAmount;

}
