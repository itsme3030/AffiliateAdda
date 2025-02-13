package com.example.affiliateadda.service;

import com.example.affiliateadda.model.*;
import com.example.affiliateadda.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @PersistenceContext
    private EntityManager entityManager;  // Inject EntityManager

    @Transactional
    public void activateTracker(Long trackerId, String reason) {

        Tracker tracker = trackerRepository.findById(trackerId).orElseThrow(() -> new RuntimeException("Tracker not found"));

        User user = userRepository.findById(tracker.getUser().getId()).orElse(null);
        if (user == null) {
            //System.out.println("------------------------------------------------------------------>User not found");
            throw new RuntimeException("User not found");
        }
        if(!user.isActive()){
            throw new RuntimeException("User is not active");
        }

        Product product = productRepository.findById(tracker.getProduct().getProductId()).orElse(null);
        if (product == null) {
            //System.out.println("------------------------------------------------------------------>User not found");
            throw new RuntimeException("Product not found");
        }
        if(!product.isActive()){
            throw new RuntimeException("Product is not active");
        }

        tracker.setActive(true);
        trackerRepository.save(tracker);

//        TrackerHistory trackerHistory = trackerHistoryRepository.findById(trackerId).orElseThrow(() -> new RuntimeException("Tracker history not found"));
//        System.out.println(trackerHistory);
//
//        User user = userRepository.findById(trackerHistory.getUserId()).orElse(null);
//        System.out.println(user);
//        if (user == null) {
//            //System.out.println("------------------------------------------------------------------>User not found");
//            throw new RuntimeException("User not found");
//        }
//
//        Product product = productRepository.findById(trackerHistory.getProductId()).orElse(null);
//        System.out.println(product);
//        if (product == null) {
//            //System.out.println("-------------------------------------------------------------------->product not found");
//            throw new RuntimeException("Product not found");
//        }
//
//        // Instead of creating a new tracker, check if it exists (restore logic)
//        Tracker tracker = trackerRepository.findById(trackerId).orElse(null);
//
//        if (tracker == null) {
//            // If tracker doesn't exist, create a new one
//            tracker = new Tracker();
//            tracker.setTId(trackerId);
//        }
//
//        tracker.setTId(trackerId);
//        tracker.setCount(trackerHistory.getCount());
//        tracker.setBuyCount(trackerHistory.getBuyCount());
//        tracker.setProductGeneratedUrl(trackerHistory.getProductGeneratedUrl());
//        tracker.setUser(user);
//        tracker.setProduct(product);
//
//        try {
//            // Save tracker
//            Tracker tempTracker = trackerRepository.save(tracker);
//            //Tracker tempTracker = entityManager.merge(tracker);
//            System.out.println("Tracker saved successfully----------->" + tempTracker);
//
//            // Remove from history after restoring
//            trackerHistoryRepository.delete(trackerHistory);
//        } catch (Exception e) {
//            System.out.println("what is the error????? --------------> "+e.getMessage());
//            throw new RuntimeException(e);
//        }
    }

    public void activateProduct(Long productId, String reason) {

        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(product.getUser().getId()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if(!user.isActive()){
            throw new RuntimeException("User is not active");
        }
        product.setActive(true);
        productRepository.save(product);

        List<Tracker> trackers = trackerRepository.findByProduct(product);
        for (Tracker tracker : trackers) {
            User user1 = userRepository.findById(tracker.getUser().getId()).orElse(null);
            if (user1 == null || !user1.isActive()) {
                continue;
            }
            tracker.setActive(true);
            trackerRepository.save(tracker);
        }

//        ProductHistory productHistory = productHistoryRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product history not found"));
//
//        User user = userRepository.findById(productHistory.getUserId()).orElse(null);
//        if (user == null) {
//            throw new RuntimeException("User not found");
//        }
//
//        Product product = new Product();
//        product.setProductId(productId);
//        product.setProductName(productHistory.getProductName());
//        product.setProductBaseurl(productHistory.getProductBaseurl());
//        product.setProductType(productHistory.getProductType());
//        product.setPerBuyPrice(productHistory.getPerBuyPrice());
//        product.setPerClickPrice(productHistory.getPerClickPrice());
//        product.setUser(user);
//
//        // Save Product
//        productRepository.save(product);
//
//        // Restore associated trackers
//        List<TrackerHistory> trackerHistories = trackerHistoryRepository.findByProductId(productId);
//        for (TrackerHistory trackerHistory : trackerHistories) {
//            User tempUser = userRepository.findById(trackerHistory.getUserId()).orElse(null);
//            if (tempUser == null) {
//                continue;
//            }
//            activateTracker(trackerHistory.gettId(),reason);
//        }
//
//        // Remove from history after restoring
//        productHistoryRepository.delete(productHistory);
    }

    public void activateUser(Long userId, String reason) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(true);
        userRepository.save(user);

        List<Tracker> trackers = trackerRepository.findByUser(user);
        for (Tracker tracker : trackers) {
           Product product = productRepository.findById(tracker.getProduct().getProductId()).orElse(null);
           if (product == null || !product.isActive()) {
               continue;
           }
           tracker.setActive(true);
           trackerRepository.save(tracker);
        }

        List<Product> products = productRepository.findByUser(user);
        for (Product product : products) {
            activateProduct(product.getProductId(), reason);
        }

//        UserHistory userHistory = userHistoryRepository.findById(userId).orElseThrow(() -> new RuntimeException("User history not found"));
//
//        User user = new User();
//        user.setId(userId);
//        user.setUsername(userHistory.getUsername());
//        user.setPassword(userHistory.getPassword());
//        user.setRole("USER");
//
//        //Save
//        userRepository.save(user);
//
//        // Restore associated trackers
//        List<TrackerHistory> trackerHistories = trackerHistoryRepository.findByUserId(userId);
//        for (TrackerHistory trackerHistory : trackerHistories) {
//            Product tempProduct = productRepository.findById(trackerHistory.getProductId()).orElse(null);
//            if (tempProduct == null) {
//                continue;
//            }
//            activateTracker(trackerHistory.gettId(),reason);  // Activate each tracker
//        }
//
//        // Restore associated products (if user uploaded products)
//        List<ProductHistory> productHistories = productHistoryRepository.findByUserId(userId);
//        for (ProductHistory productHistory : productHistories) {
//            activateProduct(productHistory.getProductId(),reason);  // Activate each product
//        }
//
//        userHistoryRepository.delete(userHistory);
    }
}
