package com.project.backend.services;

import com.project.backend.dtos.EntityMapper;
import com.project.backend.dtos.UserProfileReqDTO;
import com.project.backend.repository.UserRepository;
import com.project.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityMapper mapper;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(int uid) {
        return userRepository.findById(uid).get();
    }

//    public User saveUser(User user) {
//        return userRepository.save(user);
//    }

    @PreAuthorize("isAuthenticated()")
    public void updateUserName(String firstName, String lastName,String username) {
        System.out.println("service"+username);
        System.out.println(userRepository.updateUserName(firstName,lastName,username));
    }
//    public void updateUserName(String firstName, String lastName,int userId) {
//        userRepository.updateUserName(firstName, lastName, userId);
//    }

    public void updateUserProfile(UserProfileReqDTO userProfileReqDTO) {
        User user = mapper.userProfileToUser(userProfileReqDTO);
        userRepository.save(user);
    }
}
