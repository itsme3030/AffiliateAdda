package com.example.dummyserverbackend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class Product {

    @PostMapping("/buy")
    public String buyProduct(@RequestBody Product product) {
        return "Success";
    }
}
