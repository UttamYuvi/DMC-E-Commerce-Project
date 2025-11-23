package com.project.backend.controllers;

import com.project.backend.dtos.AuthRequestDTO;
import com.project.backend.dtos.AuthResponseDTO;
import com.project.backend.dtos.VendorRequestDTO;
import com.project.backend.entities.User;
import com.project.backend.entities.Vendor;
import com.project.backend.repository.UserRepository;
import com.project.backend.repository.VendorRepository;
import com.project.backend.security.JwtTokenProvider;
import com.project.backend.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
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
    private VendorRepository vendorRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider tokenProvider,
                          UserRepository userRepository,
                          VendorRepository vendorRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequestDTO loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            Object principal = auth.getPrincipal();
            String username;
            String role;

            if(principal instanceof User) {
                User user = (User) principal;
                username = user.getUsername();
                role = user.getAuthorities().stream().findFirst().get().getAuthority();
            }
            else if(principal instanceof Vendor) {
                Vendor vendor = (Vendor) principal;
                username = vendor.getUsername();
                role = vendor.getAuthorities().stream().findFirst().get().getAuthority();
            }
            else if (principal instanceof UserDetails) {
                UserDetails ud = (UserDetails) principal;
                username = ud.getUsername();
                role = ud.getAuthorities().stream().findFirst().get().getAuthority();
            } else {
                username = loginRequest.getUsername();
                role = "USER";
            }

            String token = tokenProvider.createToken(username,role);
            return ResponseEntity.ok(new AuthResponseDTO(token));

//            User user = (User) auth.getPrincipal();
//            System.out.println(user.getUsername());
//            System.out.println("Token: "+token);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid username/password");
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body("Authentication failed: " + ex.getMessage());
        }
    }

    @PostMapping("/register/vendor")
    public ResponseEntity<?> registerUser(@RequestBody VendorRequestDTO registerRequest) {
        if (vendorRepository.getVendorByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        Vendor vendor = new Vendor();
        vendor.setEmail(registerRequest.getEmail());
        vendor.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        vendor.setMobile(registerRequest.getMobile());
        vendor.setVendorName(registerRequest.getVendorName());
        vendor.setRole("VENDOR");
        vendorRepository.save(vendor);
        return ResponseEntity.ok("Vendor registered");
    }

}
