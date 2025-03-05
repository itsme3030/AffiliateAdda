package com.example.affiliateadda.model;

import jakarta.persistence.*;
import java.time.YearMonth;

@Entity
@Table(name = "monthly_trackers")
public class MonthlyTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long monthlyTrackerId;

    @ManyToOne
    @JoinColumn(name = "tracker_id", nullable = false)
    private Tracker tracker;

    private String month;  // This will store the month and year
    private Long count=0L;       // Click count for this particular month
    private Long buyCount=0L;   // Buy count for this particular month

    // Getters and Setters

    public Long getMonthlyTrackerId() {
        return monthlyTrackerId;
    }

    public void setMonthlyTrackerId(Long monthlyTrackerId) {
        this.monthlyTrackerId = monthlyTrackerId;
    }

    public Tracker getTracker() {
        return tracker;
    }

    public void setTracker(Tracker tracker) {
        this.tracker = tracker;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Long getBuyCount() {
        return buyCount;
    }

    public void setBuyCount(Long buyCount) {
        this.buyCount = buyCount;
    }
}
