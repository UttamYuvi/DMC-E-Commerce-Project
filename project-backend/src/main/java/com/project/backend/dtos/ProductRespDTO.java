package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRespDTO {

    private String category;
    private String subCategory;
    private String name;
    private String description;
    private double price;
    private int stock;
    private String status;
    String[] images;

}
