package com.example.paypergo.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private String username;
    private String password;
    private List<GrantedAuthority> authorities;

    // Constructor
    public CustomUserDetails(String username, String password, List<GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // You can implement logic for account expiration
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // You can implement logic for account locking
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // You can implement logic for expired credentials
    }

    @Override
    public boolean isEnabled() {
        return true; // You can implement logic for enabling/disabling the user
    }
}
