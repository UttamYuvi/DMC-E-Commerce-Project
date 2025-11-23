package com.project.backend.services;
import com.project.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomVendorDetailsService implements UserDetailsService {

    @Autowired
    private VendorRepository vendorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return vendorRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Vendor not found: " + email));
    }
}
