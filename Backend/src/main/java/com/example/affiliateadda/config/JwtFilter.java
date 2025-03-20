package com.example.affiliateadda.config;

import com.example.affiliateadda.model.CustomUserDetails;
import com.example.affiliateadda.service.CustomUserDetailsService;
import com.example.affiliateadda.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String token = extractTokenFromRequest(request);

        //debug
        //System.out.println("doFilterInternal : Token : "+token);

        if (token != null && jwtUtil.validateToken(token, getUserDetailsFromToken(token))) {
            String username = jwtUtil.extractUserName(token);

            //debug
            //System.out.println(username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, userDetails.getPassword(), userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        System.out.println("JwtFilter --> ");
        filterChain.doFilter(request, response);
    }


    private String extractTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        //System.out.println("extractTokenFromRequest : Header : "+header);
        if (header != null && header.startsWith("Bearer ")) {
            //System.out.println(header);
            //System.out.println(header.substring(7));
            return header.substring(7);
        }

        return null;
    }

    private UserDetails getUserDetailsFromToken(String token) {
        // Extract username from the token
        String username = jwtUtil.extractUserName(token);

        // Extract role from the token
        String role = jwtUtil.extractClaim(token, claims -> claims.get("role", String.class));

        // Create authorities based on role
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role)); // Prepend 'ROLE_' to the role

        // Return a CustomUserDetails object with the authorities
        return new CustomUserDetails(username, "", authorities);
    }

}

