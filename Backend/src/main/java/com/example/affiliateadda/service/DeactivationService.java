package com.example.affiliateadda.service;

import com.example.affiliateadda.model.*;
import com.example.affiliateadda.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeactivationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TrackerRepository trackerRepository;

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    @Autowired
    private ProductHistoryRepository productHistoryRepository;

    @Autowired
    private TrackerHistoryRepository trackerHistoryRepository;

    // Method to deactivate a tracker (generated link)
    public void deactivateTracker(Long trackerId, String reason) {
        //debug
        System.out.println("deactivating tracker - DeactivationService.............. " + trackerId);

        Tracker tracker = trackerRepository.findById(trackerId).orElseThrow(() -> new RuntimeException("Tracker not found"));

        tracker.setActive(false);
        trackerRepository.save(tracker);

//        // Archive tracker to history table
//        TrackerHistory trackerHistory = new TrackerHistory();
//        trackerHistory.settId(tracker.getTId()); // Preserve original trackerId
//        trackerHistory.setProductGeneratedUrl(tracker.getProductGeneratedUrl());
//        trackerHistory.setCount(tracker.getCount());
//        trackerHistory.setBuyCount(tracker.getBuyCount());
//        trackerHistory.setUserId(tracker.getUser().getId()); // Store original userId
//        trackerHistory.setProductId(tracker.getProduct().getProductId()); // Store original productId
//        trackerHistory.setDeletedAt(LocalDateTime.now());
//        trackerHistory.setReason(reason);
//        trackerHistoryRepository.save(trackerHistory);
//
//        // Delete tracker (soft delete)
//        trackerRepository.delete(tracker);

    }

    // Method to deactivate a product
    public void deactivateProduct(Long productId, String reason) {

        //debug
        System.out.println("deactivating Product - DeactivationService.............. " + productId);

        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        product.setActive(false);
        productRepository.save(product);

//        // Archive product to history table
//        ProductHistory productHistory = new ProductHistory();
//        productHistory.setProductId(product.getProductId()); // Preserve original productId
//        productHistory.setProductName(product.getProductName());
//        productHistory.setProductBaseurl(product.getProductBaseurl());
//        productHistory.setProductType(product.getProductType());
//        productHistory.setPerClickPrice(product.getPerClickPrice());
//        productHistory.setPerBuyPrice(product.getPerBuyPrice());
//        productHistory.setUserId(product.getUser().getId()); // Store original userId
//        productHistory.setDeletedAt(LocalDateTime.now());
//        productHistory.setReason(reason);
//        productHistoryRepository.save(productHistory);

        // Archive associated trackers (generated links for this product)
        List<Tracker> trackers = trackerRepository.findByProduct(product);  // Fetch all trackers associated with the product
        for (Tracker tracker : trackers) {
            deactivateTracker(tracker.getTId(), reason);
        }

//        // Delete product (soft delete)
//        productRepository.delete(product);
    }

    // Method to deactivate a user
    public void deactivateUser(Long userId, String reason) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(false);
        userRepository.save(user);

//        // Archive user to history table
//        UserHistory userHistory = new UserHistory();
//        userHistory.setUserId(user.getId()); // Store original userId from the User table
//        userHistory.setUsername(user.getUsername());
//        userHistory.setPassword(user.getPassword());
//        userHistory.setRole(user.getRole());
//        userHistory.setDeletedAt(LocalDateTime.now());
//        userHistory.setReason(reason);
//        userHistoryRepository.save(userHistory);

        // Archive associated trackers
        List<Tracker> trackers = trackerRepository.findByUser(user);
        for (Tracker tracker : trackers) {
            deactivateTracker(tracker.getTId(), reason);
        }

        // Archive associated products (if user uploaded products)
        List<Product> products = productRepository.findByUser(user);
        for (Product product : products) {
            deactivateProduct(product.getProductId(),reason);
        }

//        // Mark user as deleted (soft delete)
//        userRepository.delete(user);
    }

}