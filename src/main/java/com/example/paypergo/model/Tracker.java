package com.example.paypergo.model;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long tId;

    String productGereratedurl;
    Long count = 0L;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Tracker() {}

    public Tracker(Long tId, String productGereratedurl, Long count, User user, Product product) {
        this.tId = tId;
        this.productGereratedurl = productGereratedurl;
        this.count = count;
        this.user = user;
        this.product = product;
    }

    public Long getTId() {
        return tId;
    }

    public void setTId(Long t_id) {
        this.tId = t_id;
    }

    public String getProductGereratedurl() {
        return productGereratedurl;
    }

    public void setProductGereratedurl(String product_gereratedurl) {
        this.productGereratedurl = product_gereratedurl;
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
