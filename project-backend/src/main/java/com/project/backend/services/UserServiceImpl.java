package com.project.backend.services;

import com.project.backend.repository.UserRepository;
import com.project.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(int uid) {
        return userRepository.findById(uid).get();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void updateUserName(String firstName, String lastName,int userId) {
        userRepository.updateUserName(firstName, lastName, userId);
    }
}
