package com.example.paypergo.repository;

import com.example.paypergo.model.Product;
import com.example.paypergo.model.Tracker;
import com.example.paypergo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackerRepository extends JpaRepository<Tracker, Long> {
    Tracker findByUserAndProduct(User user, Product product);

    // Custom query to sum the 'count' field for a given productId
//    @Query("SELECT SUM(t.count) FROM Tracker t WHERE t.product.productId = :productId")
//    long sumCountByProductId(Long productId);
    @Query("SELECT COALESCE(SUM(t.count), 0) FROM Tracker t WHERE t.product.productId = :productId")
    long sumCountByProductId(Long productId);


    List<Tracker> findByUserId(Long userId);
}
