package com.project.backend.controllers;

import com.project.backend.security.SecurityConfig;
import com.project.backend.services.CustomUserDetailsService;
import com.project.backend.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SecurityConfig securityConfig;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @GetMapping("/")
//    @ResponseBody
//    public String welcome() {
//        return "<h1>Welcome to the E-commerce Site (Public Access)</h1>" +
//                "<a href='/login'>Login Page</a> | <a href='/register'>Register User</a> | <a href='/logout'>Logout</a>";
//    }
//
//    @PostMapping("/perform_register")
//    @ResponseBody
//    public String registerUser(@RequestParam String email, @RequestParam String password) {
//        System.out.println(password);
//        String hashedPassword = passwordEncoder.encode(password);
//        System.out.println(hashedPassword);
//        customUserDetailsService.saveNewUser(email,hashedPassword);
//
//        return "<h1>Registration Successful!</h1>" +
//                "<a href='/login'>Click here to Login</a>";
//    }
//
//    @GetMapping("/home")
//    @ResponseBody
//    public String homePage() {
//        return "<h1>Welcome Home! You are logged in.</h1>" +
//                "<a href='/logout'>Log Out</a>";
//    }

}
