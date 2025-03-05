package com.example.affiliateadda.model.History;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Entity
@Component
@Table(name = "products_history")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class ProductHistory {

    @Id
    @Column(nullable = false)
    private Long productId; // Preserve original productId from the Product table

    private String productName;
    private String productBaseurl;
    private String productType;
    private double perClickPrice;
    private double perBuyPrice;

    @Column(nullable = false)
    private Long userId; // Store original userId for reference

    @Column(nullable = false)
    private LocalDateTime deletedAt;

    @Column(nullable = false)
    private String reason;

    // constructor
    public ProductHistory() {}

    public ProductHistory(Long productId, String productName, String productBaseurl, String productType, double perClickPrice, double perBuyPrice, Long userId, LocalDateTime deletedAt, String reason) {
        this.productId = productId;
        this.productName = productName;
        this.productBaseurl = productBaseurl;
        this.productType = productType;
        this.perClickPrice = perClickPrice;
        this.perBuyPrice = perBuyPrice;
        this.userId = userId;
        this.deletedAt = deletedAt;
        this.reason = reason;
    }


    // Getters and Setters

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductBaseurl() {
        return productBaseurl;
    }

    public void setProductBaseurl(String productBaseurl) {
        this.productBaseurl = productBaseurl;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public double getPerClickPrice() {
        return perClickPrice;
    }

    public void setPerClickPrice(double perClickPrice) {
        this.perClickPrice = perClickPrice;
    }

    public double getPerBuyPrice() {
        return perBuyPrice;
    }

    public void setPerBuyPrice(double perBuyPrice) {
        this.perBuyPrice = perBuyPrice;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
