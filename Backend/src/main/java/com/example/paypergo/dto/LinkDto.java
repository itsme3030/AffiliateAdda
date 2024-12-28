package com.example.paypergo.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Component;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor

public class LinkDto {

    private String productName;

    @JsonCreator
    public LinkDto(@JsonProperty("productName") String productName) {
        this.productName = productName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
