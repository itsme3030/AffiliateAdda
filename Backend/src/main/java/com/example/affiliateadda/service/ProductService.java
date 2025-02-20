package com.example.affiliateadda.service;

import com.example.affiliateadda.dto.ProductDTO;
import com.example.affiliateadda.dto.ReviewDTO;
import com.example.affiliateadda.model.Product;
import com.example.affiliateadda.model.ProductDetail;
import com.example.affiliateadda.model.Review;
import com.example.affiliateadda.repository.ProductRepository;
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
        System.out.println("Product received: " + product.getProductName() + ", " + product.getProductBaseurl() + ", " + product.getPerClickPrice()+ ", "+product.getPerBuyPrice());
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

        // Fetch all products from the repository
        List<Product> products = productRepository.findAll();

        // Choosing the commission (you can adjust as needed)
        double commission = 0.5;

        // Map the Product list to ProductDTO
        return products.stream()
                .map(product -> {
                    // Fetch the associated product detail
                    ProductDetail productDetail = product.getProductDetail();

                    // Fetch reviews for the product
                    List<ReviewDTO> reviewDTOs = product.getReviews().stream()
                            .map(review -> new ReviewDTO(review)) // Convert each review to ReviewDTO
                            .collect(Collectors.toList());

                    // Create and return the ProductDTO object with all details
                    return new ProductDTO(
                            product.getProductId(),                // productId
                            product.getProductName(),              // productName
                            product.getPerClickPrice() * commission, // perClickPrice
                            product.getType(),                     // productType
                            product.getSubType(),                  // productSubType
                            product.getPerBuyPrice() * commission,  // perBuyPrice
                            productDetail.getDescription(),        // description (from ProductDetail)
                            productDetail.getShortDescription(),   // shortDescription (from ProductDetail)
                            productDetail.getTags(),               // tags (from ProductDetail)
                            productDetail.getRating(),             // rating (from ProductDetail)
                            productDetail.getRatingCount(),
                            reviewDTOs                             // List of reviews for the product
                    );
                })
                .collect(Collectors.toList()); // Collect to list
    }

//    Fetch reviews for a specific product
//    public List<ReviewDTO> getReviewsForProduct(Long productId) {
//        // Fetch reviews by productId from the repository
//        List<Review> reviews = reviewRepository.findByProductId(productId);
//
//        // Map the reviews to ReviewDTO
//        return reviews.stream()
//                .map(review -> new ReviewDTO(review)) // Convert Review to ReviewDTO
//                .collect(Collectors.toList());
//    }

}
