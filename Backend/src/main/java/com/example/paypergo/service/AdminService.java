package com.example.paypergo.service;

import com.example.paypergo.dto.AdminHomeResponseDTO;
import com.example.paypergo.dto.ProfileResponseDTO;
import com.example.paypergo.model.User;
import com.example.paypergo.model.UserHistory;
import com.example.paypergo.repository.UserHistoryRepository;
import com.example.paypergo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private UserHistoryRepository userHistoryRepository;

    public AdminHomeResponseDTO getAdminHomeData() {
        // 1. Total number of users
        long totalUsers = userRepository.count() + userHistoryRepository.count();

        // 2. Get total earnings and payable amounts for all users
        double totalEarnings = 0;
        double totalPayableAmount = 0;

        // 3. Get the list of users along with their earnings and payable amounts
        List<User> users = userRepository.findAll();
//        List<UserHistory> userHistories = userHistoryRepository.findAll();
        List<AdminHomeResponseDTO.UserDataDTO> userList = new ArrayList<>();

        for (User user : users) {
            if(user.getRole().equals("ADMIN")) {
                totalUsers--;
                continue;
            }
            ProfileResponseDTO profile = userService.getUserProfile(user.getId());

            totalEarnings += profile.getTotalEarnings();
            totalPayableAmount += profile.getTotalPayableAmount();

            AdminHomeResponseDTO.UserDataDTO userData = new AdminHomeResponseDTO.UserDataDTO();
            userData.setUserId(user.getId());
            userData.setUsername(user.getUsername());
            userData.setTotalEarnings(profile.getTotalEarnings());
            userData.setTotalPayableAmount(profile.getTotalPayableAmount());
            userData.setActive(user.isActive());

            userList.add(userData);
        }

//        for (UserHistory userHistory : userHistories) {
//            if(userHistory.getRole().equals("ADMIN")) {
//                totalUsers--;
//                continue;
//            }
//            ProfileResponseDTO profile = userService.getUserProfile(userHistory.getUserId());
//            totalEarnings += profile.getTotalEarnings();
//            totalPayableAmount += profile.getTotalPayableAmount();
//
//            AdminHomeResponseDTO.UserDataDTO userData = new AdminHomeResponseDTO.UserDataDTO();
//            userData.setUserId(userHistory.getUserId());
//            userData.setUsername(userHistory.getUsername());
//            userData.setTotalEarnings(profile.getTotalEarnings());
//            userData.setTotalPayableAmount(profile.getTotalPayableAmount());
//            userData.setActive(false);
//
//            userList.add(userData);
//        }

        // Create and return the response DTO
        AdminHomeResponseDTO response = new AdminHomeResponseDTO();
        response.setTotalUsers(totalUsers);
        response.setTotalEarnings(totalEarnings);
        response.setTotalPayableAmount(totalPayableAmount);
        response.setUsers(userList);

        return response;
    }
}
