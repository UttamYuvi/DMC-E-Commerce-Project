package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubCategoryRespDTO {

    private int categoryId;
    private int subCategoryId;
    private String name;
    private MultipartFile image;
}
