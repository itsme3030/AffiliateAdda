package com.example.affiliateadda.model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
@Component
@Table(name = "trackers")
public class Tracker {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long tId;

    String productGeneratedUrl;
    Long count = 0L;
    Long buyCount = 0L;
    boolean active = true;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Tracker() {}

    public Tracker(Long tId, String productGeneratedUrl, Long count, Long buyCount, boolean active, User user, Product product) {
        this.tId = tId;
        this.productGeneratedUrl = productGeneratedUrl;
        this.count = count;
        this.buyCount = buyCount;
        this.active = active;
        this.user = user;
        this.product = product;
    }

    public Tracker(Long tId, String productGeneratedUrl, Long count, Long buyCount, User user, Product product) {
        this.tId = tId;
        this.productGeneratedUrl = productGeneratedUrl;
        this.count = count;
        this.buyCount = buyCount;
        this.user = user;
        this.product = product;
    }

    public Tracker(Long tId, String productGeneratedUrl, Long count, User user, Product product) {
        this.tId = tId;
        this.productGeneratedUrl = productGeneratedUrl;
        this.count = count;
        this.user = user;
        this.product = product;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Long getTId() {
        return tId;
    }

    public void setTId(Long t_id) {
        this.tId = t_id;
    }

    public String getProductGeneratedUrl() {
        return productGeneratedUrl;
    }

    public void setProductGeneratedUrl(String product_gereratedurl) {
        this.productGeneratedUrl = product_gereratedurl;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public User getUser() {
        return user;
    }

    public Long getBuyCount() {
        return buyCount;
    }

    public void setBuyCount(Long buyCount) {
        this.buyCount = buyCount;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }


}
