package com.project.backend.services;

import com.project.backend.dtos.UserProfileReqDTO;
import com.project.backend.dtos.UserProfileResponseDto;
import com.project.backend.entities.Address;
import com.project.backend.entities.User;
import java.util.List;

public interface UserService {

    void updateUser(UserProfileReqDTO userProfileReqDTO, String email);

    UserProfileResponseDto getUserProfile(String email);

    List<Address> getUserAddress(String email);

}
