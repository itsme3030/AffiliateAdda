package com.example.paypergo.model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Component
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long userId;

    String userUsername;
    String userEmail;
    String userPassword;

    @OneToMany(mappedBy = "user")
    private List<Tracker> trackers;

    @OneToMany(mappedBy = "user")
    private List<Product> products;

    public User() {}

    public User(Long userId, String userUsername, String userEmail, String userPassword, List<Tracker> trackers) {
        this.userId = userId;
        this.userUsername = userUsername;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.trackers = trackers;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long user_id) {
        this.userId = user_id;
    }

    public String getUserUsername() {
        return userUsername;
    }

    public void setUserUsername(String user_username) {
        this.userUsername = user_username;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String user_email) {
        this.userEmail = user_email;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String user_password) {
        this.userPassword = user_password;
    }

    public List<Tracker> getTrackers() {
        return trackers;
    }

    public void setTrackers(List<Tracker> trackers) {
        this.trackers = trackers;
    }
}
