package com.project.backend.repository;

import com.project.backend.entities.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.net.Inet4Address;
import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {

    @Query("SELECT s FROM SubCategory s WHERE s.category.categoryId = :categoryId")
    List<SubCategory> getAllSubcategory(@Param("categoryId") int categoryId);


}
