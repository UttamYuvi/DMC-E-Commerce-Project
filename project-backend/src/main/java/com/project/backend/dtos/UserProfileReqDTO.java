package com.project.backend.dtos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileReqDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String gender;
    private String address;

}
