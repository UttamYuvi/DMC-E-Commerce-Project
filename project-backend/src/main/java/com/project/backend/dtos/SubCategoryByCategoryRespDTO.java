package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryByCategoryRespDTO {
    private String categoryName;
    private int categoryId;
    private String image;
    private String subCategoryName;
    private int subCategoryId;
}
