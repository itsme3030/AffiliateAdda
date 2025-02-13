package com.example.affiliateadda.repository;

import com.example.affiliateadda.model.Product;
import com.example.affiliateadda.model.User;
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
