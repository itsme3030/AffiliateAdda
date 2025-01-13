package com.example.paypergo.service;

import com.example.paypergo.dto.ProfileResponseDTO;

import com.example.paypergo.model.Product;
import com.example.paypergo.model.Tracker;
import com.example.paypergo.model.User;

import com.example.paypergo.repository.ProductRepository;
import com.example.paypergo.repository.TrackerRepository;
import com.example.paypergo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TrackerRepository trackerRepository;

    public Optional<User> findByUserId(Long userId) {
        return userRepository.findById(userId);
    }

    public ProfileResponseDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        //EARN
        // Fetch all trackers for the user
        List<Tracker> trackers = trackerRepository.findByUserId(userId);

        // Calculate earnings (for the user who is sharing the link)
        List<ProfileResponseDTO.EarningDTO> earnings = new ArrayList<>();
        double totalEarnings = 0;

        // Loop through trackers directly to compute earnings
        for (Tracker tracker : trackers) {
            Product product = tracker.getProduct();
            long count = tracker.getCount();
            double earningForProduct = product.getPerClickPrice() * count;

            ProfileResponseDTO.EarningDTO earningDTO = new ProfileResponseDTO.EarningDTO();
            earningDTO.setProductName(product.getProductName());
            earningDTO.setPerClickPrice(product.getPerClickPrice());
            earningDTO.setCount(count);

            earnings.add(earningDTO);
            totalEarnings += earningForProduct;
        }


        //PAY
        // Calculate payable amounts (for the user who uploaded the product)
        List<ProfileResponseDTO.PayableDTO> payableAmounts = new ArrayList<>();
        double totalPayableAmount = 0;

        // Fetch products uploaded by the user
        List<Product> products = productRepository.findByUserId(userId);
        for (Product product : products) {
            // Count the number of clicks for each product based on trackers
            long totalCountForProduct = trackerRepository.sumCountByProductId(product.getProductId());
            double payableForProduct = product.getPerClickPrice() * totalCountForProduct;

            ProfileResponseDTO.PayableDTO payableDTO = new ProfileResponseDTO.PayableDTO();
            payableDTO.setProductName(product.getProductName());
            payableDTO.setPerClickPrice(product.getPerClickPrice());
            payableDTO.setCount(totalCountForProduct);

            payableAmounts.add(payableDTO);
            totalPayableAmount += payableForProduct;
        }

        // Build the response DTO
        ProfileResponseDTO profileResponseDTO = new ProfileResponseDTO();
        profileResponseDTO.setUsername(user.getUsername());
        profileResponseDTO.setEarnings(earnings);
        profileResponseDTO.setTotalEarnings(totalEarnings);
        profileResponseDTO.setPayableAmounts(payableAmounts);
        profileResponseDTO.setTotalPayableAmount(totalPayableAmount);

        return profileResponseDTO;
    }
}
