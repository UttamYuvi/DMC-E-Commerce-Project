package com.project.backend.repository;

import com.project.backend.entities.Products;
import com.project.backend.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductsRepository extends JpaRepository<Products,Integer> {

    @Query("SELECT p FROM Products p WHERE p.subCategory.subCategoryId = :subCategoryId")
    List<Products> getAllProductsBySubCategoryId(@Param("subCategoryId") int scid);

    @Query("SELECT p FROM Products p WHERE p.vendor.vendorId = :vendorId")
    List<Products> findProductsByVendorId(int vendorId);

}
