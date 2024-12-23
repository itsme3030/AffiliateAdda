package com.example.paypergo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Component
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long product_id;

    String product_name;
    String product_baseurl;

    @OneToMany(mappedBy = "product")
    private List<Tracker> trackers;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Product() {}

    public Product(Long product_id, String product_name, String product_baseurl, List<Tracker> trackers) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_baseurl = product_baseurl;
        this.trackers = trackers;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getProduct_baseurl() {
        return product_baseurl;
    }

    public void setProduct_baseurl(String product_baseurl) {
        this.product_baseurl = product_baseurl;
    }

    public List<Tracker> getTrackers() {
        return trackers;
    }

    public void setTrackers(List<Tracker> trackers) {
        this.trackers = trackers;
    }
}
