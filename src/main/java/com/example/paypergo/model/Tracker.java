package com.example.paypergo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class Traker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long t_id;

    Long user_id;
    Long product_id;
    String product_gereratedurl;
    Long count;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
