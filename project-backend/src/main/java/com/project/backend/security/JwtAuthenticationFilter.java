package com.project.backend.security;

import com.project.backend.services.CustomUserDetailsService;
import com.project.backend.services.CustomVendorDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private CustomVendorDetailsService vendorDetailsService;

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (StringUtils.hasText(bearer) && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = getJwtFromRequest(request);
            if (token != null && tokenProvider.validateToken(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
                String username = tokenProvider.getUsernameFromToken(token);
                UserDetails userDetails = null;

                try {
                    userDetails = userDetailsService.loadUserByUsername(username);
                } catch (UsernameNotFoundException e) {
                    // try vendor
                    userDetails = vendorDetailsService.loadUserByUsername(username);
                }
                if(userDetails != null && tokenProvider.validateToken(token)) {
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        filterChain.doFilter(request, response);
    }
}
