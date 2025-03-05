package com.example.affiliateadda.model.History;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Entity
@Component
@Table(name = "trackers_history")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class TrackerHistory {
    @Id
    @Column(nullable = false)
    private Long tId; // Preserve original trackerId from the Tracker table

    private String productGeneratedUrl;
    private Long count = 0L;
    private Long buyCount = 0L;

    @Column(nullable = false)
    private Long userId; // Store original userId for reference

    @Column(nullable = false)
    private Long productId; // Store original productId for reference

    @Column(nullable = false)
    private LocalDateTime deletedAt;

    @Column(nullable = false)
    private String reason;

    // constructor

    public TrackerHistory() {}

    public TrackerHistory(Long tId, String productGeneratedUrl, Long count, Long buyCount, Long userId, Long productId, LocalDateTime deletedAt, String reason) {
        this.tId = tId;
        this.productGeneratedUrl = productGeneratedUrl;
        this.count = count;
        this.buyCount = buyCount;
        this.userId = userId;
        this.productId = productId;
        this.deletedAt = deletedAt;
        this.reason = reason;
    }

    // Getters and Setters

    public Long gettId() {
        return tId;
    }

    public void settId(Long tId) {
        this.tId = tId;
    }

    public String getProductGeneratedUrl() {
        return productGeneratedUrl;
    }

    public void setProductGeneratedUrl(String productGeneratedUrl) {
        this.productGeneratedUrl = productGeneratedUrl;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
