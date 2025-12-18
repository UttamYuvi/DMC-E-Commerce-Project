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
<<<<<<< HEAD
@AllArgsConstructor
@NoArgsConstructor
=======
@NoArgsConstructor
@AllArgsConstructor
>>>>>>> SubCategory_USER
@Entity
@Table(name="categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;
    private String name;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnore
<<<<<<< HEAD
    private List<SubCategory> subCategories = new ArrayList<>();

}
=======
    @ToString.Exclude
    private List<SubCategory> subCategories = new ArrayList<>();

}
>>>>>>> SubCategory_USER
