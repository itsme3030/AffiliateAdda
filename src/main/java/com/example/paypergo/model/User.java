package com.example.paypergo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
@Component
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long user_id;

    String user_username;
    String user_email;
    String user_password;

    @OneToMany(mappedBy = "user")
    private List<Tracker> trackers;

    @OneToMany(mappedBy = "user")
    private List<Product> products;

    public User() {}

    public User(Long user_id, String user_username, String user_email, String user_password, List<Tracker> trackers) {
        this.user_id = user_id;
        this.user_username = user_username;
        this.user_email = user_email;
        this.user_password = user_password;
        this.trackers = trackers;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getUser_username() {
        return user_username;
    }

    public void setUser_username(String user_username) {
        this.user_username = user_username;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public List<Tracker> getTrackers() {
        return trackers;
    }

    public void setTrackers(List<Tracker> trackers) {
        this.trackers = trackers;
    }
}
