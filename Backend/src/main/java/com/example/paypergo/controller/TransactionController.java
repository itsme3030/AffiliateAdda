package com.example.paypergo.controller;

import com.example.paypergo.dto.TransactionDTO;

import com.example.paypergo.repository.UserRepository;
import com.example.paypergo.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transactionService;

    // Payment Endpoint
    @PostMapping("/pay")
    public ResponseEntity<String> processPayment(Principal principal, @RequestBody TransactionDTO transactionDTO) {
        try {
            boolean paymentSuccess = transactionService.processPayment(principal, transactionDTO.getAmount());
            if (paymentSuccess) {
                return ResponseEntity.ok("Payment Successful");
            } else {
                return ResponseEntity.status(400).body("Payment Failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    // Endpoint for withdrawal transactions
    @PostMapping("/withdraw")
    public ResponseEntity<String> withdrawFunds(Principal principal, @RequestBody TransactionDTO transactionDTO) {
        try {
            boolean withdrawalSuccess = transactionService.processWithdrawal(principal, transactionDTO.getAmount());
            if (withdrawalSuccess) {
                return ResponseEntity.ok("Withdrawal Successful");
            } else {
                return ResponseEntity.status(400).body("Withdrawal Failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
}
