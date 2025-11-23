package com.project.backend.security;

import com.project.backend.services.CustomUserDetailsService;
import com.project.backend.services.CustomVendorDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private CustomVendorDetailsService vendorDetailsService;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

//    @Autowired
//    public SecurityConfig(CustomUserDetailsService userDetailsService,
//                          JwtTokenProvider tokenProvider,
//                          JwtAuthenticationFilter jwtAuthenticationFilter,
//                          JwtAuthenticationEntryPoint unauthorizedHandler) {
//        this.userDetailsService = userDetailsService;
//        this.tokenProvider = tokenProvider;
//        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//        this.unauthorizedHandler = unauthorizedHandler;
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder builder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        builder.authenticationProvider(userAuthProvider());
        builder.authenticationProvider(vendorAuthProvider());

        return builder.build();
    }

    @Bean
    public DaoAuthenticationProvider userAuthProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userDetailsService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    @Bean
    public DaoAuthenticationProvider vendorAuthProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(vendorDetailsService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/", "/user/login","/vendor/login", "/register","/register/vendor").permitAll()
                        .requestMatchers("/user/**" ,"/name").hasAuthority("USER")
                        .requestMatchers("/vendor/**","/products/category").hasAuthority("VENDOR")
                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}






