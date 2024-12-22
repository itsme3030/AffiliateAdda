package com.example.paypergo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
@Component
public class Tracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long t_id;

    Long user_id;
    Long product_id;
    String product_gereratedurl;
    Long count = 0L;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Tracker() {}

    public Tracker(Long t_id, Long user_id, Long product_id, String product_gereratedurl, Long count, User user, Product product) {
        this.t_id = t_id;
        this.user_id = user_id;
        this.product_id = product_id;
        this.product_gereratedurl = product_gereratedurl;
        this.count = count;
        this.user = user;
        this.product = product;
    }

    public Long getT_id() {
        return t_id;
    }

    public void setT_id(Long t_id) {
        this.t_id = t_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public String getProduct_gereratedurl() {
        return product_gereratedurl;
    }

    public void setProduct_gereratedurl(String product_gereratedurl) {
        this.product_gereratedurl = product_gereratedurl;
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
