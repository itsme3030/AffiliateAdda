package com.example.paypergo.service;

import com.example.paypergo.dto.AdminHomeResponseDTO;
import com.example.paypergo.dto.ProfileResponseDTO;
import com.example.paypergo.model.User;
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

    public AdminHomeResponseDTO getAdminHomeData() {
        // 1. Total number of users
        long totalUsers = userRepository.count();

        // 2. Get total earnings and payable amounts for all users
        double totalEarnings = 0;
        double totalPayableAmount = 0;

        // 3. Get the list of users along with their earnings and payable amounts
        List<User> users = userRepository.findAll();
        List<AdminHomeResponseDTO.UserDataDTO> userList = new ArrayList<>();

        for (User user : users) {
            ProfileResponseDTO profile = userService.getUserProfile(user.getId());

            totalEarnings += profile.getTotalEarnings();
            totalPayableAmount += profile.getTotalPayableAmount();

            AdminHomeResponseDTO.UserDataDTO userData = new AdminHomeResponseDTO.UserDataDTO();
            userData.setUsername(user.getUsername());
            userData.setTotalEarnings(profile.getTotalEarnings());
            userData.setTotalPayableAmount(profile.getTotalPayableAmount());

            userList.add(userData);
        }

        // Create and return the response DTO
        AdminHomeResponseDTO response = new AdminHomeResponseDTO();
        response.setTotalUsers(totalUsers);
        response.setTotalEarnings(totalEarnings);
        response.setTotalPayableAmount(totalPayableAmount);
        response.setUsers(userList);

        return response;
    }
}
