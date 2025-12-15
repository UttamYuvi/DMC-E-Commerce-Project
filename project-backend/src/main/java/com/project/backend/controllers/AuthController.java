package com.project.backend.controllers;

import com.project.backend.dtos.AuthRequestDTO;
import com.project.backend.dtos.AuthResponseDTO;
import com.project.backend.dtos.VendorAuthResponseDTO;
import com.project.backend.dtos.VendorRequestDTO;
import com.project.backend.entities.User;
import com.project.backend.entities.Vendor;
import com.project.backend.repository.UserRepository;
import com.project.backend.repository.VendorRepository;
import com.project.backend.security.JwtTokenProvider;
import com.project.backend.security.SecurityConfig;
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
//@RequestMapping("/login")
public class AuthController {

    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private SecurityConfig securityConfig;


        @PostMapping("/login/vendor")
        public ResponseEntity<?> authenticateVendor(@RequestBody AuthRequestDTO loginRequest) {
            try {
                AuthenticationManager manager = securityConfig.vendorAuthManager(securityConfig.vendorAuthProvider()) ;
                Authentication auth = manager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
                );
                Vendor vendor = (Vendor) auth.getPrincipal();
                String role = vendor.getAuthorities().stream().findFirst().get().getAuthority();
                String token = tokenProvider.createToken(vendor.getEmail(), role);
                AuthResponseDTO responseDTO = new AuthResponseDTO(token,role);
                return ResponseEntity.ok(responseDTO);
            } catch (BadCredentialsException ex) {
                return ResponseEntity.status(401).body("Invalid username/password");
            } catch (AuthenticationException ex) {
                return ResponseEntity.status(401).body("Authentication failed: " + ex.getMessage());
            }
        }

    @PostMapping("/login/user")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequestDTO loginRequest) {
        User user = new User();
        if(userRepository.getUserByEmail(loginRequest.getUsername()).isEmpty()) {
            user.setEmail(loginRequest.getUsername());
            user.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
            userRepository.save(user);
        }
        try {
            AuthenticationManager manager = securityConfig.userAuthManager(securityConfig.userAuthProvider());
            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            user = (User) auth.getPrincipal();
            String role = user.getAuthorities().stream().findFirst().get().getAuthority();
            String token = tokenProvider.createToken(user.getEmail(), role);
            AuthResponseDTO responseDTO = new AuthResponseDTO(token,role);
            return ResponseEntity.ok(responseDTO);
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
        vendor.setFirstName(registerRequest.getFirstName());
        vendor.setLastName(registerRequest.getLastName());
        vendor.setRole("VENDOR");
        vendorRepository.save(vendor);
        return ResponseEntity.ok("Vendor registered");
    }
}
