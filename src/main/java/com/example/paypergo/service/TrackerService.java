package com.example.paypergo.service;

import com.example.paypergo.model.Product;
import com.example.paypergo.model.Tracker;
import com.example.paypergo.model.User;
import com.example.paypergo.repository.TrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
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


    public String generateLink(Long user_id, Long product_id, String product_baseurl) {
        // Construct the query string with the parameters
        String queryString = String.format("user_id=%d&product_id=%d&product_baseurl=%s", user_id, product_id, product_baseurl);

        // Encode only the query parameters part
        String encodedParams = Base64.getEncoder().encodeToString(queryString.getBytes());

        // Construct the base URL with the encoded query parameters
        String mydomainurl = "http://localhost:8080/link/track";
        String url = String.format("%s?data=%s", mydomainurl, encodedParams);

        // Fetch the User and Product entities using the IDs
        Optional<User> user = userService.findByUserId(user_id);  // Assuming you have a service method to fetch User
        Optional<Product> product = productService.findByProductId(product_id);  // Similarly, for Product

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


    public boolean trackClick(String encodedUrl) {

        // Decode the parameters
        String decodedParams = new String(Base64.getDecoder().decode(encodedUrl));

        // Split the decoded parameters by "&"
        String[] params = decodedParams.split("&");

        // Extract the individual parameters
        Long user_Id = Long.valueOf(params[0].split("=")[1]);
        Long product_Id = Long.valueOf(params[1].split("=")[1]);
        String product_baseurl = params[2].split("=")[1];

        // Fetch the User and Product entities
        Optional<User> user = userService.findByUserId(user_Id);
        Optional<Product> product = productService.findByProductId(product_Id);

        // Check if user and product exist
        if (!user.isPresent() || !product.isPresent()) {
            return false; // If either user or product not found, return false
        }

        // Find the LinkTrackerTable entry based on the user and product associations
        Optional<Tracker> linkTracker = Optional.ofNullable(trackerRepository.findByUserAndProduct(user.get(), product.get()));

        if (linkTracker.isPresent()) {
            Tracker tracker = linkTracker.get();
            tracker.setCount(tracker.getCount() + 1); // Increment click count
            trackerRepository.save(tracker); // Save the updated tracker
        }
        return true; // Return true indicating the click was successfully tracked
    }

}
