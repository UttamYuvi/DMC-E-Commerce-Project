package com.project.backend.services;
import com.project.backend.entities.User;
import com.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return user;
    }

    public void saveNewUser(String email, String hashedPassword) {
        if (userRepository.getUserByEmail(email).isPresent())
            throw new RuntimeException("Email already exists!");
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(hashedPassword);
        newUser.setRole("USER");
        userRepository.save(newUser);
    }
}
