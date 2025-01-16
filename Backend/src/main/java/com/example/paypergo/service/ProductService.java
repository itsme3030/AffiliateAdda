package com.example.paypergo.service;

import com.example.paypergo.dto.ProductDTO;
import com.example.paypergo.model.Product;
import com.example.paypergo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product getProductById(Long productId) {
        return productRepository.findByProductId(productId);
    }

    public Product addProduct(Product product) {
        System.out.println("---------------------------------------------------->inside addProduct - controller : "+product);
        System.out.println("Product received: " + product.getProductName() + ", " + product.getProductBaseurl() + ", " + product.getPerClickPrice());
        return productRepository.save(product);
    }

    public Optional<Product> findByProductId(Long product_id) {
        return Optional.ofNullable(productRepository.findByProductId(product_id));
    }

    public List<String> getAllProductNames() {
        // Fetch all products and extract the product name
        System.out.println("Fetching the list of productName...(Service)");
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(Product::getProductName)  // Extract the product name
                .collect(Collectors.toList()); // Return the names as a list
    }

    public Optional<Product> findByProductName(String productName) {
        return productRepository.findByProductName(productName);
    }

    public List<ProductDTO> getAllProducts() {
        // Fetch all products and convert to ProductDTO
        System.out.println("Fetching the list of products...(Service)");

        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(product -> new ProductDTO(product.getProductId(), product.getProductName(), product.getPerClickPrice(), product.getProductType()))
                .collect(Collectors.toList());
    }
}
