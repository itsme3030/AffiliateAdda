package com.example.paypergo.controller;

import com.example.paypergo.dto.LinkDto;
import com.example.paypergo.model.Product;
import com.example.paypergo.service.ProductService;
import com.example.paypergo.service.TrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/link")
public class TrackerController {

    @Autowired
    private TrackerService trackerService;

    @Autowired
    private ProductService productService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateLink(@RequestBody LinkDto linkDto) {
        Long productId = linkDto.getProductId();
        Product product = productService.getProductById(productId);
        if (product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
        Long user_id = linkDto.getUserId();
        Long product_id = product.getProductId();
        String product_baseurl = product.getProductBaseurl();

        String encodedUrl = trackerService.generateLink(user_id, product_id, product_baseurl);
        System.out.println("Generated link: " + encodedUrl);
        return new ResponseEntity<>(encodedUrl, HttpStatus.OK);
    }

    @GetMapping("/track")
    @CrossOrigin
    public ResponseEntity<String> trackClick(@RequestParam String data){
        boolean isTracked = trackerService.trackClick(data);

        // If tracking fails, return a 400 Bad Request status
        if (!isTracked) {
            return new ResponseEntity<>("Failed to track click", HttpStatus.BAD_REQUEST);
        }

        // Return a success message with a 200 OK status
        return new ResponseEntity<>("Click tracked successfully!", HttpStatus.OK);

    }

}
