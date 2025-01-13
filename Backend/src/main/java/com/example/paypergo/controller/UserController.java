package com.example.paypergo.controller;

import com.example.paypergo.dto.ProfileResponseDTO;
import com.example.paypergo.model.User;
import com.example.paypergo.repository.UserRepository;
import com.example.paypergo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponseDTO> getUserProfile(Principal principal) {
        //get user
        String username = principal.getName();
        Optional<User> user = userRepository.findByUsername(username);
        Long userId = user.map(User::getId).orElse(null);

        ProfileResponseDTO profileResponse = userService.getUserProfile(userId);

        return ResponseEntity.ok(profileResponse);
    }

}
