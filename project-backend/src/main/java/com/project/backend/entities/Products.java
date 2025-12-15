package com.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    @ManyToOne
    @JoinColumn(name="vendorId")
    @JsonIgnore
    private Vendor vendor;
    private int categoryId;
    private int subCategoryId;
    private String name;
    private String description;
    private double price;
    private int stock;
    private String status;
}
