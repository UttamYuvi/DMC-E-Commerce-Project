package com.project.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressReqDTO {

    private String addressLine;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String landmark;
    private String addressType;


}
