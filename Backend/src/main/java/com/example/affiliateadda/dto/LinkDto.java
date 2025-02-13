package com.example.paypergo.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Component;

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
