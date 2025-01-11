package com.example.paypergo.config;

import com.example.paypergo.service.CustomUserDetailsService;
import com.example.paypergo.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

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
        System.out.println("Token : "+token);

        if (token != null && jwtUtil.validateToken(token, getUserDetailsFromToken(token))) {
            String username = jwtUtil.extractUserName(token);

            //debug
            System.out.println(username);

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
        System.out.println("Header : "+header);
        if (header != null && header.startsWith("Bearer ")) {
            System.out.println(header);
            System.out.println(header.substring(7));
            return header.substring(7);
        }

        return null;
    }

    private UserDetails getUserDetailsFromToken(String token) {
        //debug : getUserDetailsFromToken
        System.out.println("inside getUserDetailsFromToken");
        String username = jwtUtil.extractUserName(token);
        return userDetailsService.loadUserByUsername(username);
    }
}

