package com.example.paypergo.repository;

import com.example.paypergo.model.Product;
import com.example.paypergo.model.Tracker;
import com.example.paypergo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrackerRepository extends JpaRepository<Tracker, Long> {
    Tracker findByUserAndProduct(User user, Product product);
}
