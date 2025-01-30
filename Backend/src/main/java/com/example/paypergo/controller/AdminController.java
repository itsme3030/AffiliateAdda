package com.example.paypergo.controller;

import com.example.paypergo.dto.AdminHomeResponseDTO;
import com.example.paypergo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/home")
    public AdminHomeResponseDTO getAdminHomeData() {
        return adminService.getAdminHomeData();
    }

}
