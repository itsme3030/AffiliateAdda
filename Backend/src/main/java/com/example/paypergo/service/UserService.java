package com.example.paypergo.service;

import com.example.paypergo.dto.ProfileResponseDTO;

import com.example.paypergo.model.*;

import com.example.paypergo.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
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
        double commission = 0.5;

        // Loop through trackers directly to compute earnings
        for (Tracker tracker : trackers) {
            Product product = tracker.getProduct();
            long count = tracker.getCount();
            long buyCount = tracker.getBuyCount();
            long tId = tracker.getTId();
            String productGeneratedUrl = tracker.getProductGeneratedUrl();

            //debug
//            System.out.println("------------------------productGeneratedUrl--------------------------->"+productGeneratedUrl);
//            System.out.println(tracker.getProductGeneratedUrl());

            double earningForProduct = product.getPerClickPrice() * commission * count;
            double earningForProductBuy = product.getPerBuyPrice() * commission * buyCount;

            ProfileResponseDTO.EarningDTO earningDTO = new ProfileResponseDTO.EarningDTO();
            earningDTO.settId(tId);
            earningDTO.setProductGeneratedUrl(productGeneratedUrl);
            earningDTO.setProductName(product.getProductName());
            earningDTO.setPerClickPrice(product.getPerClickPrice());
            earningDTO.setCount(count);
            earningDTO.setPerBuyPrice(product.getPerBuyPrice());
            earningDTO.setBuyCount(buyCount);

            earnings.add(earningDTO);
            totalEarnings += earningForProduct + earningForProductBuy;
        }


        //PAY
        // Calculate payable amounts (for the user who uploaded the product)
        List<ProfileResponseDTO.PayableDTO> payableAmounts = new ArrayList<>();
        double totalPayableAmount = 0;

        // Fetch products uploaded by the user
        List<Product> products = productRepository.findByUserId(userId);
        for (Product product : products) {
            // Count the number of clicks for each product based on trackers

            long productId = product.getProductId();
            String productBaseurl = product.getProductBaseurl();
            long totalCountForProduct = trackerRepository.sumCountByProductId(product.getProductId());
            long totalCountForProductBuy = trackerRepository.sumBuyCountByProductId(product.getProductId());

            double payableForProduct = product.getPerClickPrice() * totalCountForProduct +
                                        product.getPerBuyPrice() * totalCountForProductBuy;

            ProfileResponseDTO.PayableDTO payableDTO = new ProfileResponseDTO.PayableDTO();
            payableDTO.setProductId(productId);
            payableDTO.setProductBaseurl(productBaseurl);
            payableDTO.setProductName(product.getProductName());
            payableDTO.setPerClickPrice(product.getPerClickPrice());
            payableDTO.setCount(totalCountForProduct);
            payableDTO.setPerBuyPrice(product.getPerBuyPrice());
            payableDTO.setBuyCount(totalCountForProductBuy);

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
