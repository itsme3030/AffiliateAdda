package com.example.paypergo.service;

import com.example.paypergo.model.Tracker;
import com.example.paypergo.repository.TrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;

@Service
public class TrackerService {

    @Autowired
    private TrackerRepository trackerRepository;

    public String generateLink(Long user_id, Long product_id, String product_baseurl) {
        // Construct the URL with the parameters
        String mydomainurl = "http://localhost:5432/track";
        String url = String.format("%s?user_id=%d&product_id=%d&product_baseurl=%s",mydomainurl, user_id, product_id, product_baseurl);

        // Encode the URL
        String encodedUrl = Base64.getEncoder().encodeToString(url.getBytes());

        Tracker tracker = new Tracker();
        tracker.setUser_id(user_id);
        tracker.setProduct_id(product_id);
        tracker.setProduct_gereratedurl(encodedUrl);

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

        // Find the LinkTrackerTable entry based on user_id and product_id
        Optional<Tracker> linkTracker = Optional.ofNullable(trackerRepository.findByUserIdAndProductId(user_Id, product_Id));

        if (linkTracker.isPresent()) {
            Tracker tracker = linkTracker.get();
            tracker.setCount(tracker.getCount() + 1);
            trackerRepository.save(tracker); // Update the count
        }

    }
}
