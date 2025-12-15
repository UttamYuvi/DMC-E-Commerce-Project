package com.project.backend.dtos;

import com.project.backend.entities.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponseDto {

    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String gender;
    private List<AddressReqDTO> addressList;

}
