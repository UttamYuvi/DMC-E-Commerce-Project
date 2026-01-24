package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendorOrderRespDTO {


    private String name;
    private String firstName;
    private String created_at;
    private int orderId;
    private double amount;
    private String status;


}
