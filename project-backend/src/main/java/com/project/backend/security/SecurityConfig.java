package com.project.backend.security;

import com.project.backend.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableAutoConfiguration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt is highly recommended for securely hashing passwords
        System.out.println("Testing 5");
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        System.out.println("Testing 6");
        return authProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("Testing 1");
        http.
                csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Allow public access to welcome, login pages, and related URLs
                        .requestMatchers("/", "/login", "/perform_login", "/logout","/register", "/perform_register").permitAll()
                        // Require authentication for any other request
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login") // The URL for the custom login page (GET request)
                        .loginProcessingUrl("/perform_login") // The URL where the form submits (POST request)
                        .defaultSuccessUrl("/home", true) // Redirect after successful login
                        .failureUrl("/login?error=true") // Redirect after failed login
                        .permitAll() // Ensure login URLs are publicly accessible
                )

                // Configure the logout mechanism
                .logout(logout -> logout
                        .logoutUrl("/logout") // The URL to trigger logout
                        .logoutSuccessUrl("/") // Redirect after successful logout
                        .permitAll() // Ensure logout URL is public
                );
        System.out.println("Testing 2");
        http.authenticationProvider(authenticationProvider());

        return http.build();
    }
}









