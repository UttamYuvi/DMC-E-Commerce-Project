package com.project.backend.controllers;

import com.project.backend.dtos.UserProfileReqDTO;
import com.project.backend.entities.User;
import com.project.backend.security.SecurityConfig;
import com.project.backend.services.CustomUserDetailsService;
import com.project.backend.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<?> getUserById(@PathVariable("uid") int uid) {
        return ResponseEntity.ok(userService.getUserById(uid));
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserProfileReqDTO userProfileReqDTO) {
        userService.updateUserProfile(userProfileReqDTO);
        return ResponseEntity.ok("");
    }

    @PutMapping("/{uid}")
    public ResponseEntity<?> updateUser(@PathVariable("uid") int uid, @RequestBody User user) {
        userService.updateUserName(user.getFirstName(), user.getLastName(), uid);
        return ResponseEntity.ok("updated");
    }
}
