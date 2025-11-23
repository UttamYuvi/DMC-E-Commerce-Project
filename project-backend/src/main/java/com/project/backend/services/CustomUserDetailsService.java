package com.project.backend.services;
import com.project.backend.entities.User;
import com.project.backend.entities.Vendor;
import com.project.backend.repository.UserRepository;
import com.project.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private VendorRepository vendorRepository;
    private UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository,VendorRepository vendorRepository) {
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmail(email).orElse(null);
        if(user != null)
            return user;

        Vendor vendor = vendorRepository.getVendorByEmail(email).orElse(null);
        if(vendor != null)
            return vendor;

        throw new UsernameNotFoundException("No user/vendor found with email: " + email);
    }

    public void saveNewUser(String email, String hashedPassword) {
        if (userRepository.getUserByEmail(email).isPresent() || vendorRepository.getVendorByEmail(email).isPresent())
            throw new RuntimeException("Email already exists!");
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(hashedPassword);
        newUser.setRole("USER");
        userRepository.save(newUser);
    }

    public void saveNewVendor(String email, String hashPassword) {
        if (userRepository.getUserByEmail(email).isPresent() || vendorRepository.getVendorByEmail(email).isPresent())
            throw new RuntimeException("Email already exists!");
        Vendor newVendor = new Vendor();
        newVendor.setEmail(email);
        newVendor.setPassword(hashPassword);
        newVendor.setRole("VENDOR");
        vendorRepository.save(newVendor);
    }
}
