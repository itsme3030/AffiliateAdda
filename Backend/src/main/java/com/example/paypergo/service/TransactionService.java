package com.example.paypergo.service;

import com.example.paypergo.model.*;
import com.example.paypergo.repository.ProductRepository;
import com.example.paypergo.repository.TrackerRepository;
import com.example.paypergo.repository.TransactionRepository;
import com.example.paypergo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrackerRepository trackerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public boolean processPayment(Principal principal, double amount) {
        String username = principal.getName();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return false;
        }

        boolean success = false;

        double userEarnings = findUserEarnings(user.get().getId());
        double userWithdrawals = findUserWithdrawals(user.get());
        double remainingEarnings = userEarnings - userWithdrawals;
        if(remainingEarnings < amount){
            return false;
        }

        // Create a transaction record
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setUser(user.get());
        transaction.setTransactionType(TransactionType.PAYMENT);
        transaction.setStatus(TransactionStatus.COMPLETED);
        transaction.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(transaction);

        success = true;
        return success;
    }


    public boolean processWithdrawal(Principal principal, double amount) {
        String username = principal.getName();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return false;
        }

        boolean success = false;

//        // We will use it for per month pay : Mail to user for remaining payment...
//        double userPayableAmount = findUserPayableAmount(user.get().getId());
//        double userPays = findUserPays(user.get());
//        double remainingPays = userPayableAmount - userPays;

        // Create a transaction record
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setUser(user.get());
        transaction.setTransactionType(TransactionType.PAYMENT);
        transaction.setStatus(TransactionStatus.COMPLETED);
        transaction.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(transaction);

        success = true;
        return success;
    }

    public double findUserEarnings(Long userId) {
        List<Tracker> trackers = trackerRepository.findByUserId(userId);

        double totalEarnings = 0;
        double commission = 0.5;

        for (Tracker tracker : trackers) {
            Product product = tracker.getProduct();
            long count = tracker.getCount();
            long buyCount = tracker.getBuyCount();

            double earningForProduct = product.getPerClickPrice() * commission * count;
            double earningForProductBuy = product.getPerBuyPrice() * commission * buyCount;

            totalEarnings += earningForProduct + earningForProductBuy;
        }
        return totalEarnings;
    }

    private double findUserWithdrawals(User user) {
        List<Transaction> transactions = transactionRepository.findByUser(user);
        double totalWithdrawals = 0;
        for (Transaction transaction : transactions) {
            if(transaction.getTransactionType().equals("WITHDRAWAL") && transaction.getStatus() == TransactionStatus.COMPLETED){
                totalWithdrawals += transaction.getAmount();
            }
        }
        return totalWithdrawals;
    }

    public double findUserPayableAmount(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        double totalPayableAmount = 0;

        // Fetch products uploaded by the user
        List<Product> products = productRepository.findByUserId(userId);
        for (Product product : products) {

            // Count the number of clicks for each product based on trackers
            long totalCountForProduct = trackerRepository.sumCountByProductId(product.getProductId());
            long totalCountForProductBuy = trackerRepository.sumBuyCountByProductId(product.getProductId());

            double payableForProduct = product.getPerClickPrice() * totalCountForProduct +
                    product.getPerBuyPrice() * totalCountForProductBuy;

            totalPayableAmount += payableForProduct;
        }
        return totalPayableAmount;
    }

    private double findUserPays(User user) {
        List<Transaction> transactions = transactionRepository.findByUser(user);
        double totalPays = 0;
        for (Transaction transaction : transactions) {
            if(transaction.getTransactionType().equals("PAYMENT") && transaction.getStatus() == TransactionStatus.COMPLETED){
                totalPays += transaction.getAmount();
            }
        }
        return totalPays;
    }
}
