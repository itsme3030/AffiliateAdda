package com.example.paypergo.dto;

import org.springframework.stereotype.Component;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor

public class LinkDto {
    private Long userId;
    private Long productId;

    public LinkDto(Long userId, Long productId) {
        this.userId = userId;
        this.productId = productId;
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
}
