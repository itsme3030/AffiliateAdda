package com.example.paypergo.service;

import com.example.paypergo.model.*;
import com.example.paypergo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivationService {

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

    public void activateTracker(Long trackerId, String reason) {
        TrackerHistory trackerHistory = trackerHistoryRepository.findById(trackerId).orElseThrow(() -> new RuntimeException("Tracker history not found"));

        User user = userRepository.findById(trackerHistory.getUserId()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Product product = productRepository.findById(trackerHistory.getProductId()).orElse(null);
        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        Tracker tracker = new Tracker();
        tracker.setTId(trackerId);
        tracker.setCount(trackerHistory.getCount());
        tracker.setBuyCount(trackerHistory.getBuyCount());
        tracker.setProductGeneratedUrl(trackerHistory.getProductGeneratedUrl());
        tracker.setUser(user);
        tracker.setProduct(product);

        // Save tracker
        trackerRepository.save(tracker);

        // Remove from history after restoring
        trackerHistoryRepository.delete(trackerHistory);
    }

    public void activateProduct(Long productId, String reason) {
        ProductHistory productHistory = productHistoryRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product history not found"));

        User user = userRepository.findById(productHistory.getUserId()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Product product = new Product();
        product.setProductId(productId);
        product.setProductName(productHistory.getProductName());
        product.setProductBaseurl(productHistory.getProductBaseurl());
        product.setProductType(productHistory.getProductType());
        product.setPerBuyPrice(productHistory.getPerBuyPrice());
        product.setPerClickPrice(productHistory.getPerClickPrice());
        product.setUser(user);

        // Save Product
        productRepository.save(product);

        // Restore associated trackers
        List<TrackerHistory> trackerHistories = trackerHistoryRepository.findByProductId(productId);
        for (TrackerHistory trackerHistory : trackerHistories) {
            User tempUser = userRepository.findById(trackerHistory.getUserId()).orElse(null);
            if (tempUser == null) {
                continue;
            }
            activateTracker(trackerHistory.gettId(),reason);
        }

        // Remove from history after restoring
        productHistoryRepository.delete(productHistory);
    }

    public void activateUser(Long userId, String reason) {
        UserHistory userHistory = userHistoryRepository.findById(userId).orElseThrow(() -> new RuntimeException("User history not found"));

        User user = new User();
        user.setId(userId);
        user.setUsername(userHistory.getUsername());
        user.setPassword(userHistory.getPassword());
        user.setRole("USER");

        //Save
        userRepository.save(user);

        // Restore associated trackers
        List<TrackerHistory> trackerHistories = trackerHistoryRepository.findByUserId(userId);
        for (TrackerHistory trackerHistory : trackerHistories) {
            Product tempProduct = productRepository.findById(trackerHistory.getProductId()).orElse(null);
            if (tempProduct == null) {
                continue;
            }
            activateTracker(trackerHistory.gettId(),reason);  // Activate each tracker
        }

        // Restore associated products (if user uploaded products)
        List<ProductHistory> productHistories = productHistoryRepository.findByUserId(userId);
        for (ProductHistory productHistory : productHistories) {
            activateProduct(productHistory.getProductId(),reason);  // Activate each product
        }

    }
}
