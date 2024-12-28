package com.example.paypergo.controller;

import com.example.paypergo.model.Product;
import com.example.paypergo.model.User;
import com.example.paypergo.service.ProductService;
import com.example.paypergo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
@CrossOrigin("http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    // Endpoint to add a new product
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product, HttpServletRequest request) {
        //Get User
        Long userId= 0L;
        HttpSession session = request.getSession(false);
        if (session != null) {
            userId = (Long) session.getAttribute("userId");
        }
        Optional<User> user = userService.findByUserId(userId);

        //set User to Product
        product.setUser(user.get());

        Product savedProduct = productService.addProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/list")
    public ResponseEntity<List<String>> listProduct() {
        System.out.println("Fetching the list of productName...(Controller)");
        return ResponseEntity.ok(productService.getAllProductNames());
    }
}
