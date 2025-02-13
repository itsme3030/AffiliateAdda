package com.example.affiliateadda.dto;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor

public class LinkDto {

    private Long productId;

    public LinkDto() {

    }

    public LinkDto(Long productId) {
        this.productId = productId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
