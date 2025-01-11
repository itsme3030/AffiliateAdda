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
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user")
    private List<Tracker> trackers;

    @OneToMany(mappedBy = "user")
    private List<Product> products;

    public User() {}

    public User(Long id, String username, String password, List<Tracker> trackers, List<Product> products) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.trackers = trackers;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<Tracker> getTrackers() {
        return trackers;
    }

    public void setTrackers(List<Tracker> trackers) {
        this.trackers = trackers;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}