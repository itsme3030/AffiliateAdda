package com.example.paypergo.dto;

public class ProductDTO {

    private Long productId;
    private String productName;
    private Long perClickPrice;

    public ProductDTO(Long productId, String productName, Long perClickPrice) {
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

    public Long getPerClickPrice() {
        return perClickPrice;
    }

    public void setPerClickPrice(Long perClickPrice) {
        this.perClickPrice = perClickPrice;
    }
}
