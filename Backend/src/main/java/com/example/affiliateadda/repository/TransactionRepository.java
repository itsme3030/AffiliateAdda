package com.example.paypergo.repository;

import com.example.paypergo.model.Tracker;
import com.example.paypergo.model.Transaction;
import com.example.paypergo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository  extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUser(User user);
}
