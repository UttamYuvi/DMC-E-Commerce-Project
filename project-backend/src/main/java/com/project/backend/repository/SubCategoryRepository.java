package com.project.backend.repository;

import com.project.backend.dtos.SubCategoryWithCategoryDTO;
import com.project.backend.entities.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.net.Inet4Address;
import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {

    @Query("SELECT s FROM SubCategory s WHERE s.category.categoryId = :categoryId")
    List<SubCategory> getAllSubcategory(@Param("categoryId") int categoryId);

    @Query(value = """
        SELECT DISTINCT
            c.categoryId as categoryId,
            s.subCategoryId AS subCategoryId,
            s.name          AS subCategoryName,
            s.image         AS image,
            c.name          AS categoryName
        FROM subcategories s
        JOIN products p ON p.subCategoryId = s.subCategoryId
        JOIN categories c ON c.categoryId = s.categoryId
        WHERE p.stock > 0
          AND p.status = 'continue'
        ORDER BY RAND()
        """, nativeQuery = true)
    List<SubCategoryWithCategoryDTO> findAvailableSubCategories();


    @Query(value = """
            SELECT * FROM subCategories WHERE categoryId = :categoryId
            """, nativeQuery = true)
    List<SubCategory> getSubCategoriesByCategoryId(@Param("categoryId") int categoryId);

}
