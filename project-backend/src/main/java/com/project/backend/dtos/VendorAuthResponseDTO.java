package com.project.backend.dtos;

import com.project.backend.entities.Vendor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorAuthResponseDTO{

    private int vendorId;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;

}
