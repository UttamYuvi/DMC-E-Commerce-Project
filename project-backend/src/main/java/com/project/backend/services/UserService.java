package com.project.backend.services;

import com.project.backend.entities.User;
import java.util.List;

public interface UserService {

    public List<User> getAllUsers();

    public User getUserById(int uid);

    public User saveUser(User user);

    void updateUserName(String firstName, String lastName, int userId);
}
