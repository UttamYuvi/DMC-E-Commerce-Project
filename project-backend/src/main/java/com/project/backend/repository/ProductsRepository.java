package com.project.backend.repository;

import com.project.backend.entities.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductsRepository extends JpaRepository<Products,Integer> {

    @Query("SELECT p FROM Products p WHERE p.vendor.vendorId = :vendorId")
    List<Products> findProductsByVendorId(int vendorId);

    List<Products> findByCategory_CategoryIdAndSubCategory_SubCategoryId(
            int categoryId,
            int subCategoryId
    );

}
