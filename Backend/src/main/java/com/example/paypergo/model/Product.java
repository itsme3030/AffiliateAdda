package com.example.paypergo.model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Component
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "products_seq")
    @SequenceGenerator(name = "products_seq", sequenceName = "products_seq", allocationSize = 1)
    Long productId;

    String productName;
    String productBaseurl;
    String productType;
    double perClickPrice;
    double perBuyPrice;
    boolean active = true;

    @OneToMany(mappedBy = "product")
    private List<Tracker> trackers;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Product() {}

    public Product(Long productId, String productName, String productBaseurl, double perClickPrice, String productType, double perBuyPrice, List<Tracker> trackers, User user) {
        this.productId = productId;
        this.productName = productName;
        this.productBaseurl = productBaseurl;
        this.perClickPrice = perClickPrice;
        this.productType = productType;
        this.perBuyPrice = perBuyPrice;
        this.trackers = trackers;
        this.user = user;
    }

    public Product(Long productId, String productName, String productBaseurl, double perClickPrice, String productType, List<Tracker> trackers, User user) {
        this.productId = productId;
        this.productName = productName;
        this.productBaseurl = productBaseurl;
        this.perClickPrice = perClickPrice;
        this.productType = productType;
        this.trackers = trackers;
        this.user = user;
    }

    public Product(Long productId, String productName, String productBaseurl, String productType, double perClickPrice, double perBuyPrice, boolean active, List<Tracker> trackers, User user) {
        this.productId = productId;
        this.productName = productName;
        this.productBaseurl = productBaseurl;
        this.productType = productType;
        this.perClickPrice = perClickPrice;
        this.perBuyPrice = perBuyPrice;
        this.active = active;
        this.trackers = trackers;
        this.user = user;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public double getPerClickPrice() {
        return perClickPrice;
    }

    public void setPerClickPrice(double perClickPrice) {
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

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public double getPerBuyPrice() {
        return perBuyPrice;
    }

    public void setPerBuyPrice(double perBuyPrice) {
        this.perBuyPrice = perBuyPrice;
    }
}
