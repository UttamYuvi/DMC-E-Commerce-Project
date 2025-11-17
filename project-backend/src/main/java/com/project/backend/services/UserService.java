package com.project.backend.services;

import com.project.backend.dtos.UserProfileReqDTO;
import com.project.backend.entities.User;
import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUserById(int uid);

    User saveUser(User user);

    void updateUserProfile(UserProfileReqDTO userProfileReqDTO);

    void updateUserName(String firstName, String lastName, int userId);
}
