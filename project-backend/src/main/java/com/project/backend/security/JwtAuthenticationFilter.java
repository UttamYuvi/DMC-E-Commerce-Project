    package com.project.backend.security;

    import com.project.backend.services.CustomUserDetailsService;
    import com.project.backend.services.CustomVendorDetailsService;
    import io.jsonwebtoken.Claims;
    import jakarta.servlet.FilterChain;
    import jakarta.servlet.ServletException;
    import jakarta.servlet.http.*;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
    import org.springframework.stereotype.Component;
    import org.springframework.util.StringUtils;
    import org.springframework.web.filter.OncePerRequestFilter;

    import java.io.IOException;
    import java.util.List;

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
                if (token != null && tokenProvider.validateToken(token)) {
                    String role = tokenProvider.getRoleFromToken(token);
                    String username = tokenProvider.getUsernameFromToken(token);
                    UserDetails userDetails;
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);

                    try {
                        userDetails = userDetailsService.loadUserByUsername(username);
                    } catch (UsernameNotFoundException ex) {
                        userDetails = vendorDetailsService.loadUserByUsername(username);
                    }
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    List.of(authority)
                            );
                    authentication.setDetails(new WebAuthenticationDetailsSource()
                            .buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("Authenticated " + username + " with role: " + role);
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            filterChain.doFilter(request, response);
        }
    }
