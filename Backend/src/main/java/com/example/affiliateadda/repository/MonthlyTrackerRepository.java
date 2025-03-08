package com.example.affiliateadda.repository;

import com.example.affiliateadda.model.MonthlyTracker;
import com.example.affiliateadda.model.Tracker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.YearMonth;
import java.util.Optional;

public interface MonthlyTrackerRepository extends JpaRepository<MonthlyTracker, Long> {
    Optional<MonthlyTracker> findByTrackerAndMonth(Tracker tracker, String month);

}
