package com.example.paypergo.repository;

import com.example.paypergo.model.Product;
import com.example.paypergo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductId(Long product_id);

    Optional<Product> findByProductName(String productName);

    List<Product> findByUserId(Long userId);

    List<Product> findByUser(User user);

}
