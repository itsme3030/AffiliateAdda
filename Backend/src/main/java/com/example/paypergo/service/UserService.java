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

    @Autowired
    private TrackerHistoryRepository trackerHistoryRepository;

    @Autowired
    private ProductHistoryRepository productHistoryRepository;

    public Optional<User> findByUserId(Long userId) {
        return userRepository.findById(userId);
    }

    public ProfileResponseDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        //EARN
        // Fetch all trackers for the user
        List<Tracker> trackers = trackerRepository.findByUserId(userId);

        List<TrackerHistory> trackerHistories = trackerHistoryRepository.findByUserId(userId);

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
            earningDTO.setActive(true);

            earnings.add(earningDTO);
            totalEarnings += earningForProduct + earningForProductBuy;
        }

        // Loop through trackerHistories directly to compute earnings
        for (TrackerHistory trackerHistory : trackerHistories) {

            long count = trackerHistory.getCount();
            long buyCount = trackerHistory.getBuyCount();
            long tId = trackerHistory.gettId();
            String productGeneratedUrl = trackerHistory.getProductGeneratedUrl();
            double earningForProduct;
            double earningForProductBuy;

            Long productId = trackerHistory.getProductId();
            Product product = null;
            ProductHistory productHistory = null;

            product = productRepository.findById(productId).orElse(null);
            if (product != null) {
                earningForProduct = product.getPerClickPrice() * commission * count;
                earningForProductBuy = product.getPerBuyPrice() * commission * buyCount;
            }else{
                productHistory = productHistoryRepository.findById(productId).orElse(null);
                if (productHistory != null) {
                    earningForProduct = productHistory.getPerClickPrice() * commission * count;
                    earningForProductBuy = productHistory.getPerBuyPrice() * commission * buyCount;
                }else{
                    throw new RuntimeException("Product & Product history not found");
                }
            }

            ProfileResponseDTO.EarningDTO earningDTO = new ProfileResponseDTO.EarningDTO();
            earningDTO.settId(tId);
            earningDTO.setProductGeneratedUrl(productGeneratedUrl);
            earningDTO.setCount(count);
            earningDTO.setBuyCount(buyCount);
            earningDTO.setActive(true);
            earningDTO.setProductName(product!=null?product.getProductName():productHistory.getProductName());
            earningDTO.setPerClickPrice(product!=null?product.getPerClickPrice():productHistory.getPerClickPrice());
            earningDTO.setPerBuyPrice(product!=null?product.getPerBuyPrice():productHistory.getPerBuyPrice());
            earningDTO.setActive(false);

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
            payableDTO.setActive(true);

            payableAmounts.add(payableDTO);
            totalPayableAmount += payableForProduct;
        }

        // Fetch productsHistory
        List<ProductHistory> productHistories = productHistoryRepository.findByUserId(userId);
        for (ProductHistory productHistory : productHistories) {
            long productId = productHistory.getProductId();
            String productBaseurl = productHistory.getProductBaseurl();
            long totalCountForProduct = trackerHistoryRepository.sumCountByProductId(productHistory.getProductId());
            long totalCountForProductBuy = trackerHistoryRepository.sumBuyCountByProductId(productHistory.getProductId());

            double payableForProduct = productHistory.getPerClickPrice() * totalCountForProduct +
                    productHistory.getPerBuyPrice() * totalCountForProductBuy;

            ProfileResponseDTO.PayableDTO payableDTO = new ProfileResponseDTO.PayableDTO();
            payableDTO.setProductId(productId);
            payableDTO.setProductBaseurl(productBaseurl);
            payableDTO.setProductName(productHistory.getProductName());
            payableDTO.setPerClickPrice(productHistory.getPerClickPrice());
            payableDTO.setCount(totalCountForProduct);
            payableDTO.setPerBuyPrice(productHistory.getPerBuyPrice());
            payableDTO.setBuyCount(totalCountForProductBuy);
            payableDTO.setActive(false);

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
