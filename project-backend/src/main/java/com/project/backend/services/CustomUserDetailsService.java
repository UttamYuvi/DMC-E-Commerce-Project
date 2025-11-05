package com.project.backend.services;
import com.project.backend.entities.UserCredentials;
import com.project.backend.repository.UserCredentialsRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserCredentialsRepository userCredentialsRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Testing 3");
        UserCredentials userCredentials = userCredentialsRepository.getUserByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        System.out.println("Testing 4");
        return userCredentials;
    }

    public void saveNewUser(String email, String hashedPassword) {
        // You might want to add validation here (e.g., check if email already exists)
        if (userCredentialsRepository.getUserByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        UserCredentials newUser = new UserCredentials();
        newUser.setEmail(email);
        newUser.setPassword(hashedPassword);
        // Roles are handled automatically in your UserCredentials entity

        userCredentialsRepository.save(newUser);
    }
}
