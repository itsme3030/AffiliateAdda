package com.example.paypergo.controller;

import com.example.paypergo.dto.AdminHomeResponseDTO;
import com.example.paypergo.service.AdminService;
import com.example.paypergo.service.DeactivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private DeactivationService deactivationService;

    @GetMapping("/home")
    public AdminHomeResponseDTO getAdminHomeData() {
        return adminService.getAdminHomeData();
    }

    // deactivate a user
    @PostMapping("/deactivateUser/{userId}")
    public ResponseEntity<String> deactivateUser(@PathVariable Long userId) {
        try {
            deactivationService.deactivateUser(userId, "User deactivated");
            return new ResponseEntity<>("User deactivated successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error deactivating user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
