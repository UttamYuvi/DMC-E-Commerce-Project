package com.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
<<<<<<< HEAD
=======
import lombok.ToString;
>>>>>>> SubCategory_USER

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
<<<<<<< HEAD
@Table(name="subcategories")
=======
@Table(name = "subcategories")
>>>>>>> SubCategory_USER
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subCategoryId;
    private String name;
    private String image;
    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnore
<<<<<<< HEAD
    private Category category;

    @OneToMany(mappedBy = "subCategory", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Products> products = new ArrayList<>();
}
=======
    @ToString.Exclude
    private Category category;
    @OneToMany(mappedBy = "subCategory", cascade = CascadeType.ALL)
    @JsonIgnore
    @ToString.Exclude
    private List<Products> products = new ArrayList<>();
}
>>>>>>> SubCategory_USER
