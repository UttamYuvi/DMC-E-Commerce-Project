package com.project.backend.controllers;

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
@RequestMapping("/")
public class UserController {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private SecurityConfig securityConfig;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/")
    @ResponseBody
    public String welcome() {
        return "<h1>Welcome to the E-commerce Site (Public Access)</h1>" +
                "<a href='/login'>Login Page</a> | <a href='/register'>Register User</a> | <a href='/logout'>Logout</a>";
    }

    @GetMapping("/login")
    @ResponseBody
    public String showLoginPage() {
        return "<h1>Login Page</h1>" +
                "<form action='/perform_login' method='post'>" +
                "    <label for='username'>Email (Username):</label>" +
                "    <input type='text' id='username' name='username'><br>" +
                "    <label for='password'>Password:</label>" +
                "    <input type='password' id='password' name='password'><br>" +
                "    <input type='submit' value='Log In'>" +
                "</form>";
    }

    @GetMapping("/register")
    @ResponseBody
    public String showRegistrationPage() {
        return "<h1>User Registration</h1>" +
                "<form action='/perform_register' method='post'>" +
                "    <label for='email'>Email (Username):</label>" +
                "    <input type='text' id='email' name='email'><br>" +
                "    <label for='password'>Password:</label>" +
                "    <input type='password' id='password' name='password'><br>" +
                "    <input type='submit' value='Register'>" +
                "</form>";
    }

    @PostMapping("/perform_register")
    @ResponseBody
    public String registerUser(@RequestParam String email, @RequestParam String password) {
        // Here you must hash the password before saving it to the database
        System.out.println(password);
        String hashedPassword = passwordEncoder.encode(password);
        System.out.println(hashedPassword);
        customUserDetailsService.saveNewUser(email,hashedPassword);

        return "<h1>Registration Successful!</h1>" +
                "<a href='/login'>Click here to Login</a>";
    }

    @GetMapping("/home")
    @ResponseBody
    public String homePage() {
        return "<h1>Welcome Home! You are logged in.</h1>" +
                "<a href='/logout'>Log Out</a>";
    }

//    @GetMapping
//    public ResponseEntity<?> getAllUsers() {
//        List<User> users = userService.getAllUsers();
//        return ResponseEntity.ok(users);
//    }
//
//    @PostMapping
//    public ResponseEntity<?> saveUser(@RequestBody User user) {
//        userService.saveUser(user);
//        return ResponseEntity.ok(user);
//    }
//
//    @GetMapping("/{uid}")
//    public ResponseEntity<?> getUserById(@PathVariable("uid") int uid) {
//        return ResponseEntity.ok(userService.getUserById(uid));
//    }
//
//    @PutMapping("/{uid}")
//    public ResponseEntity<?> updateUser(@PathVariable("uid") int uid, @RequestBody User user) {
//        userService.updateUserName(user.getFirstName(), user.getLastName(), uid);
//        return ResponseEntity.ok("updated");
//    }
}
