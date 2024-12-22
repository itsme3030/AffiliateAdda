package com.example.paypergo.repository;

import com.example.paypergo.model.Tracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrackerRepository extends JpaRepository<Tracker, Long> {
    Tracker findByUserIdAndProductId(Long userId, Long productId);
}
