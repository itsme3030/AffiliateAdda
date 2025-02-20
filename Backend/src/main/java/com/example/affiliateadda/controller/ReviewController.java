package com.example.affiliateadda.controller;

import com.example.affiliateadda.dto.ReviewSubmitDto;
import com.example.affiliateadda.model.Review;
import com.example.affiliateadda.model.User;
import com.example.affiliateadda.repository.UserRepository;
import com.example.affiliateadda.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserRepository userRepository;

    // Endpoint to submit or update a review
    @PostMapping("/submit")
    public ResponseEntity<Review> submitReview(@RequestBody ReviewSubmitDto reviewSubmitDto) {

        //debug
        System.out.println("inside submitReview - controller");

        // Fetch the user based on username from the session storage
        User user = userRepository.findByUsername(reviewSubmitDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Review review = reviewService.submitReview(
                reviewSubmitDto.getProductId(),
                user.getId(),
                reviewSubmitDto.getRating(),
                reviewSubmitDto.getReviewText()
        );

        return ResponseEntity.ok(review);
    }

    // Endpoint to get all reviews for a product
//    @GetMapping("/product/{productId}")
//    public ResponseEntity<List<Review>> getReviewsForProduct(@PathVariable Long productId) {
//        List<Review> reviews = reviewService.getReviewsForProduct(productId);
//        return ResponseEntity.ok(reviews);
//    }
}

