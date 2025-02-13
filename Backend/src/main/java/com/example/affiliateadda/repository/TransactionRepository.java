package com.example.affiliateadda.repository;

import com.example.affiliateadda.model.Transaction;
import com.example.affiliateadda.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository  extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUser(User user);
}
