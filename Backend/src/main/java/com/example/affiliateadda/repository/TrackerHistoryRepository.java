package com.example.affiliateadda.repository;

import com.example.affiliateadda.model.History.TrackerHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackerHistoryRepository extends JpaRepository<TrackerHistory, Long> {
    List<TrackerHistory> findByProductId(Long productId);

    List<TrackerHistory> findByUserId(Long userId);

    @Query("SELECT COALESCE(SUM(t.count), 0) FROM TrackerHistory t WHERE t.productId = :productId")
    long sumCountByProductId(Long productId);

    @Query("SELECT COALESCE(SUM(t.buyCount), 0) FROM TrackerHistory t WHERE t.productId = :productId")
    long sumBuyCountByProductId(Long productId);
}

