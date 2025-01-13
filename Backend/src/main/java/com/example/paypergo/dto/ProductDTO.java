package com.example.paypergo.dto;

public class ProductDTO {

    private Long productId;
    private String productName;
    private double perClickPrice;

    public ProductDTO(Long productId, String productName, double perClickPrice) {
        this.productId = productId;
        this.productName = productName;
        this.perClickPrice = perClickPrice;
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

    public double getPerClickPrice() {
        return perClickPrice;
    }

    public void setPerClickPrice(double perClickPrice) {
        this.perClickPrice = perClickPrice;
    }
}
