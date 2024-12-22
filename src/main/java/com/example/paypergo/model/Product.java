package com.example.paypergo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long product_id;

    String product_name;
    String product_baseurl;

    @OneToMany(mappedBy = "product")
    private List<LinkTraker> linkTrakers;
}
