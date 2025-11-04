package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductReqDTO {

    private int vendorId;
    private int categoryId;
    private int subCategoryId;
    private String name;
    private String description;
    private double price;
    private int stock;
}
