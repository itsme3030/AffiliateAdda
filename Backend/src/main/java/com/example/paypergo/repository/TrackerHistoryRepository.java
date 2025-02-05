package com.example.paypergo.repository;

import com.example.paypergo.model.TrackerHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrackerHistoryRepository extends JpaRepository<TrackerHistory, Long> {
}

