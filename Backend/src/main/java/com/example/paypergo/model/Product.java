package com.example.paypergo.model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Component
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long productId;

    String productName;
    String productBaseurl;
    Long perClickPrice;

    @OneToMany(mappedBy = "product")
    private List<Tracker> trackers;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Product() {}

    public Product(Long productId, String productName, String productBaseurl, Long perClickPrice, List<Tracker> trackers, User user) {
        this.productId = productId;
        this.productName = productName;
        this.productBaseurl = productBaseurl;
        this.perClickPrice = perClickPrice;
        this.trackers = trackers;
        this.user = user;
    }

    public Long getPerClickPrice() {
        return perClickPrice;
    }

    public void setPerClickPrice(Long perClickPrice) {
        this.perClickPrice = perClickPrice;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Tracker> getTrackers() {
        return trackers;
    }

    public void setTrackers(List<Tracker> trackers) {
        this.trackers = trackers;
    }

    public String getProductBaseurl() {
        return productBaseurl;
    }

    public void setProductBaseurl(String productBaseurl) {
        this.productBaseurl = productBaseurl;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
