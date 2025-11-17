package com.project.backend.controllers;

import com.project.backend.dtos.AuthRequestDTO;
import com.project.backend.dtos.AuthResponseDTO;
import com.project.backend.entities.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.security.JwtTokenProvider;
import com.project.backend.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider tokenProvider,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequestDTO loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            User user = (User) auth.getPrincipal();
            System.out.println(user.getUsername());
            String token = tokenProvider.createToken(user.getUsername(), user.getRole());
            System.out.println("Token: "+token);
            return ResponseEntity.ok(new AuthResponseDTO(token));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid username/password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequestDTO registerRequest) {
        if (userRepository.getUserByEmail(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        User u = new User();
        u.setEmail(registerRequest.getUsername());
        u.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        u.setRole("USER");
        userRepository.save(u);
        return ResponseEntity.ok("User registered");
    }

}
