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
        // Construct the URL with the parameters
        String mydomainurl = "http://localhost:5432/track";
        String url = String.format("%s?user_id=%d&product_id=%d&product_baseurl=%s",mydomainurl, user_id, product_id, product_baseurl);

        // Encode the URL
        String encodedUrl = Base64.getEncoder().encodeToString(url.getBytes());

        // Fetch the User and Product entities using the IDs
        Optional<User> user = userService.findByUserId(user_id);  // Assuming you have a service method to fetch User
        Optional<Product> product = productService.findByProductId(product_id);  // Similarly, for Product

        // Check if user and product exist
        if (!user.isPresent() || !product.isPresent()) {
            return "User or Product not found";
        }

        Tracker tracker = new Tracker();
        tracker.setProductGereratedurl(encodedUrl);


        // Set the user and product associations
        tracker.setUser(user.get());
        tracker.setProduct(product.get());

        // Save or update the record in the database
        trackerRepository.save(tracker);

        return encodedUrl;
    }

    public void trackClick(String encodedUrl) {

        // Decode the URL
        String decodedUrl = new String(Base64.getDecoder().decode(encodedUrl));

        // Step 1: Extract the query string (everything after the "?")
        String queryString = decodedUrl.split("\\?")[1]; // Splits at the "?" and gets the second part

        // Step 2: Split the query string by "&" to get the individual key-value pairs
        String[] params = queryString.split("&");

        // Step 3: Extract the individual parameters
        Long user_Id = Long.valueOf(params[0].split("=")[1]);
        Long product_Id = Long.valueOf(params[1].split("=")[1]);
        String product_baseurl = params[2].split("=")[1];

        // Fetch the User and Product entities
        Optional<User> user = userService.findByUserId(user_Id);
        Optional<Product> product = productService.findByProductId(product_Id);

        // Check if user and product exist
        if (!user.isPresent() || !product.isPresent()) {
            return;
        }

        // Find the LinkTrackerTable entry based on the user and product associations
        Optional<Tracker> linkTracker = Optional.ofNullable(trackerRepository.findByUserAndProduct(user.get(), product.get()));

        if (linkTracker.isPresent()) {
            Tracker tracker = linkTracker.get();
            tracker.setCount(tracker.getCount() + 1);
            trackerRepository.save(tracker); // Update the count
        }

    }
}
