package com.project.backend.security;

import com.project.backend.services.CustomUserDetailsService;
import com.project.backend.services.CustomVendorDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

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


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public AuthenticationManager userAuthManager(DaoAuthenticationProvider daoAuthenticationProvider) {
        return new ProviderManager(List.of(userAuthProvider()));
    }

    public AuthenticationManager vendorAuthManager(DaoAuthenticationProvider daoAuthenticationProvider) {
        return new ProviderManager(List.of(vendorAuthProvider()));
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
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedOrigin("http://127.0.0.1:5173");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
                .authorizeHttpRequests(auth -> auth
                        // PUBLIC ENDPOINTS
                        .requestMatchers(
                                "/uploads/**",
                                "/login/**",
                                "/register/**",
                                "/products/**",
                                "/procucts/subcategory/**",
                                "/categories/**"
//                                "/products/subcategories/**"
                        ).permitAll()
                        .requestMatchers("/vendor/**",
                                "/product/**",
                                "/order"
//                                "/products/delete/**",
//                                "/category/vendor/**",
//                                "/subcategory/vendor/**"
//                                "/products/vendor/**",
//                                "/products/category",
//                                "/products/add"
                        ).hasAuthority("VENDOR")
                        .requestMatchers("/user/**",
                                "/category/user",
                                "/subcategory/**",
                                "/orders/**"
                        ).hasAuthority("USER")
                        .anyRequest().authenticated()
                );
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}





