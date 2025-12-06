package com.project.backend.repository;

import com.project.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer>  {

    @Query("SELECT c FROM Category c WHERE c.vendor.vendorId = :vendorId")
    List<Category> findAllByVendorId(@Param("vendorId") int vendorId);


    @Modifying
    @Query("DELETE FROM Category c WHERE c.vendor.vendorId = :vendorId AND c.categoryId = :categoryId")
    int deleteByVendorIdAndCategoryId(int vendorId, int categoryId);

    @Modifying
    @Query("UPDATE Category c SET c.name = :name, c.image = :image WHERE c.categoryId = :categoryId")
    int updateCategory(
            @Param("name") String name,
            @Param("image") String image,
            @Param("categoryId") int categoryId
    );
}
