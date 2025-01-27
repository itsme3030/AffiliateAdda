package com.example.paypergo.service;

import com.example.paypergo.model.Product;
import com.example.paypergo.model.Tracker;
import com.example.paypergo.model.User;
import com.example.paypergo.repository.TrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;

@Service
public class TrackerService {

    @Autowired
    private TrackerRepository trackerRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;


    public String generateLink(Long userId, Long productId, String productBaseurl) {

        // Fetch the User and Product entities using the IDs
        Optional<User> user = userService.findByUserId(userId);
        Optional<Product> product = productService.findByProductId(productId);

        // Check if either user or product is missing
        if (!user.isPresent()) {
            return "User not found";
        }
        if (!product.isPresent()) {
            return "Product not found";
        }

        // Find the LinkTrackerTable entry based on the user and product associations
        Optional<Tracker> linkTracker = Optional.ofNullable(trackerRepository.findByUserAndProduct(user.get(), product.get()));
        if(linkTracker.isPresent()) {
            Tracker tracker = linkTracker.get();
            return tracker.getProductGereratedurl();
        }

        // Construct the query string with the parameters
        String queryString = String.format("user_id=%d&product_id=%d&product_baseurl=%s", userId, productId, productBaseurl);

        // Encode only the query parameters part
        String encodedParams = Base64.getEncoder().encodeToString(queryString.getBytes());

        // Construct the base URL with the encoded query parameters
        String mydomainurl = "http://localhost:8080/link/track";
        String url = String.format("%s?data=%s", mydomainurl, encodedParams);

        // Check if user and product exist
        if (!user.isPresent() || !product.isPresent()) {
            return "User or Product not found";
        }

        Tracker tracker = new Tracker();
        tracker.setProductGereratedurl(url); // Save the full URL with encoded query params

        // Set the user and product associations
        tracker.setUser(user.get());
        tracker.setProduct(product.get());

        // Save or update the record in the database
        trackerRepository.save(tracker);

        return url; // Returning the full URL with the encoded query parameters
    }


    public String trackClick(String encodedUrl) {
        // Decode the parameters
        String decodedParams = new String(Base64.getDecoder().decode(encodedUrl));

        // Split the decoded parameters by "&"
        String[] params = decodedParams.split("&");

        // Extract the individual parameters
        Long userId = Long.valueOf(params[0].split("=")[1]);
        Long productId = Long.valueOf(params[1].split("=")[1]);
        String productBaseUrl = params[2].split("=")[1];  // Extract product base URL

        // Fetch the User and Product entities
        Optional<User> user = userService.findByUserId(userId);
        Optional<Product> product = productService.findByProductId(productId);

        // Check if user and product exist
        if (!user.isPresent() || !product.isPresent()) {
            return null; // Return null if user or product not found
        }

        // Find the LinkTrackerTable entry based on the user and product associations
        Optional<Tracker> linkTracker = Optional.ofNullable(trackerRepository.findByUserAndProduct(user.get(), product.get()));

        if (linkTracker.isPresent()) {
            Tracker tracker = linkTracker.get();
            tracker.setCount(tracker.getCount() + 1); // Increment click count
            trackerRepository.save(tracker); // Save the updated tracker
        }

        // Check if the base URL is of Dummy server
        if (productBaseUrl.startsWith("http://localhost:5174/product")) {
            // Append userId and productId as query parameters
            productBaseUrl = productBaseUrl + "?data=" + encodeParams(userId, productId);
        }

        // Return the product base URL if click tracking was successful
        return productBaseUrl;
    }

    public String encodeParams(Long userId, Long productId) {
        String combinedParams = userId + ":" + productId; // Concatenate userId and productId
        return Base64.getEncoder().encodeToString(combinedParams.getBytes()); // Base64 encode
    }


    public ResponseEntity<String> trackBuy(String data) {
        try {
            // Decode the encoded data (Base64)
            String decodedData = new String(Base64.getDecoder().decode(data));

            // Split the decoded data by "&" to separate the individual parameters
            String[] params = decodedData.split("&");

            // Extract userId, productId, and buyCount
            Long userId = Long.valueOf(params[0].split("=")[1]);
            Long productId = Long.valueOf(params[1].split("=")[1]);
            Long buyCount = Long.valueOf(params[2].split("=")[1]);

            // Fetch the User and Product entities
            Optional<User> user = userService.findByUserId(userId);
            Optional<Product> product = productService.findByProductId(productId);

            if (!user.isPresent() || !product.isPresent()) {
                return new ResponseEntity<>("User or Product not found", HttpStatus.NOT_FOUND);
            }

            // Find the LinkTrackerTable entry based on the user and product associations
            Optional<Tracker> linkTracker = Optional.ofNullable(trackerRepository.findByUserAndProduct(user.get(), product.get()));


            if (linkTracker.isPresent()) {
                Tracker tracker = linkTracker.get();
                tracker.setBuyCount(tracker.getBuyCount() + buyCount); // Increment the buy count
                trackerRepository.save(tracker);
            }

            return ResponseEntity.ok("Buy count updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error updating buy count", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
