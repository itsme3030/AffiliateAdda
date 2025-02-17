package com.example.affiliateadda.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products_detail")
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productDetailId;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String description;
    private String shortDescription;
    private String tags;
    private int rating;

//    private String imageUrl;
}
