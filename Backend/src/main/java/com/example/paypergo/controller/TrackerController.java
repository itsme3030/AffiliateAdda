package com.example.paypergo.controller;

import com.example.paypergo.dto.LinkDto;
import com.example.paypergo.model.Product;
import com.example.paypergo.model.User;
import com.example.paypergo.repository.UserRepository;
import com.example.paypergo.service.ProductService;
import com.example.paypergo.service.TrackerService;
import com.example.paypergo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@Controller
@RequestMapping("/link")
@CrossOrigin("http://localhost:5173")
public class TrackerController {

    @Autowired
    private TrackerService trackerService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateLink(@RequestBody LinkDto linkDto, Principal principal) {

        //get user
        String username = principal.getName();
        Optional<User> user = userRepository.findByUsername(username);
        Long userId = user.map(User::getId).orElse(null);

        //get Product
        String productName = linkDto.getProductName();
        Optional<Product> product = productService.findByProductName(productName);
        if (product.isEmpty()) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
        Long productId = product.get().getProductId();
        String productBaseurl = product.get().getProductBaseurl();

        //encode url
        String encodedUrl = trackerService.generateLink(userId, productId, productBaseurl);
        System.out.println("Generated link: " + encodedUrl);

        return new ResponseEntity<>(encodedUrl, HttpStatus.OK);
    }

    @GetMapping("/track")
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
