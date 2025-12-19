package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRespDTO {

    private int id;
    private int categoryId;
    private int subCategoryId;
    private String category;
    private String subCategory;
    private String name;
    private String description;
    private double price;
    private int stock;
    private String status;
    String images;
    @CreationTimestamp
    private LocalDateTime createdAt;

}
