package com.example.paypergo.service;

import com.example.paypergo.model.Product;
import com.example.paypergo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product getProductById(Long productId) {
        return productRepository.findByProductId(productId);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
}
