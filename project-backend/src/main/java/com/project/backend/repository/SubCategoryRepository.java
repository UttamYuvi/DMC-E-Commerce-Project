package com.project.backend.repository;

import com.project.backend.entities.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory,Integer> {

    @Query("select s from SubCategory s where s.category.categoryId=:categoryId")
    List<SubCategory> getAllSubCategories(@Param("categoryId") int categoryId);

}
