package com.example.affiliateadda.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Entity
@Component
@Table(name = "users_history")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class UserHistory {

    @Id
    @Column(nullable = false)
    private Long userId; // Preserve original userId from the User table

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private LocalDateTime deletedAt;

    @Column(nullable = false)
    private String reason;

    // constructor
    public UserHistory() {}

    public UserHistory(Long userId, String username, String password, String role, LocalDateTime deletedAt, String reason) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.deletedAt = deletedAt;
        this.reason = reason;
    }

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
