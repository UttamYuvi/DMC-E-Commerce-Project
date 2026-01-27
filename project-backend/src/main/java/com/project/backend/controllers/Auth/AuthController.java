package com.project.backend.controllers.Auth;

import com.project.backend.dtos.*;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@RestController
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
        public ResponseEntity<Resp<?>> authenticateVendor(@RequestBody AuthRequestDTO loginRequest) {
            try {
                AuthenticationManager manager = securityConfig.vendorAuthManager(securityConfig.vendorAuthProvider()) ;
                Authentication auth = manager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
                );
                Vendor vendor = (Vendor) auth.getPrincipal();
                Vendor checkVendor = vendorRepository.getVendorByEmail(loginRequest.getUsername()).get();
                if(checkVendor.getStatus().equals("inactive")) {
                    return ResponseEntity.ok(Resp.error("Unauthorized Vendor"));
                }
                String role = vendor.getAuthorities().stream().findFirst().get().getAuthority();
                String token = tokenProvider.createToken(vendor.getEmail(), role);
                AuthResponseDTO responseDTO = new AuthResponseDTO(token,role,vendor.getFirstName(), vendor.getLastName(), vendor.getEmail(), vendor.getMobile());
                return ResponseEntity.ok(Resp.success(responseDTO));
            } catch (BadCredentialsException ex) {
                return ResponseEntity.ok(Resp.error("Invalid username/password"));
            } catch (AuthenticationException ex) {
                return ResponseEntity.ok(Resp.error("Authentication failed: " + ex.getMessage()));
            }
        }

    @PostMapping("/login/user")
    public ResponseEntity<Resp<?>> authenticateUser(@RequestBody AuthRequestDTO loginRequest) {
        System.out.println("userlogin");
        User user = new User();
        if(userRepository.getUserByEmail(loginRequest.getUsername()).isEmpty()) {
            return ResponseEntity.ok(Resp.error(null,"User is not yet registered"));
        }
        try {
            AuthenticationManager manager = securityConfig.userAuthManager(securityConfig.userAuthProvider());
            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            user = (User) auth.getPrincipal();
            String role = user.getAuthorities().stream().findFirst().get().getAuthority();
            String token = tokenProvider.createToken(user.getEmail(), role);
            AuthResponseDTO responseDTO = new AuthResponseDTO(token,role, user.getFirstName(), user.getLastName(), user.getEmail(), user.getMobile());
            return ResponseEntity.ok(Resp.success(responseDTO));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.ok(Resp.success("Invalid username/password"));
        } catch (AuthenticationException ex) {
            return ResponseEntity.ok(Resp.success("Authentication failed: "+ ex.getMessage()));
        }
    }

    @PostMapping("/register/vendor")
    public ResponseEntity<?> registerVendor(@RequestBody VendorRequestDTO registerRequest) {
        System.out.println(registerRequest.getEmail());
        if (vendorRepository.getVendorByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        Vendor vendor = new Vendor();
        vendor.setEmail(registerRequest.getEmail());
        vendor.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        vendor.setMobile(registerRequest.getMobile());
        vendor.setFirstName(registerRequest.getFirstName());
        vendor.setLastName(registerRequest.getLastName());
        vendor.setStatus("inactive");
        vendor.setRole("VENDOR");
        vendorRepository.save(vendor);
        return ResponseEntity.ok("Vendor registered");
    }

    @PostMapping("/register/user")
    public ResponseEntity<?> registerUser(@RequestBody UserRequestDTO registerRequest) {
        if (userRepository.getUserByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User already present");
        }
        System.out.println("User for register:"+registerRequest);
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setMobile(registerRequest.getMobile());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setRole("USER");
        userRepository.save(user);
        return ResponseEntity.ok("User registered");
    }
}
