package com.project.backend.repository;

import com.project.backend.entities.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {

    @Query("SELECT s FROM SubCategory s where s.category.categoryId = :categoryId")
    public List<SubCategory> getAllSubCategoryByCategoryId(@Param("categoryId") int categoryId);

}
