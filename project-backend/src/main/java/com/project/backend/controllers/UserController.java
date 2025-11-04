package com.project.backend.controllers;

import com.project.backend.entities.User;
import com.project.backend.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<?> getUserById(@PathVariable("uid") int uid) {
        return ResponseEntity.ok(userService.getUserById(uid));
    }

    @PutMapping("/{uid}")
    public ResponseEntity<?> updateUser(@PathVariable("uid") int uid, @RequestBody User user) {
        userService.updateUserName(user.getFirstName(), user.getLastName(), uid);
        return ResponseEntity.ok("updated");
    }

}
