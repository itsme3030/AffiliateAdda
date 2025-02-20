package com.example.affiliateadda.controller;

import com.example.affiliateadda.dto.ProfileResponseDTO;
import com.example.affiliateadda.model.User;
import com.example.affiliateadda.repository.UserRepository;
import com.example.affiliateadda.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponseDTO> getUserProfile(Principal principal) {
        //get user
        String username = principal.getName();
        //String username = "yash.sojitra.2020@gmail.com"; //testing purpose
        Optional<User> user = userRepository.findByUsername(username);
        Long userId = user.map(User::getId).orElse(null);

        ProfileResponseDTO profileResponse = userService.getUserProfile(userId);

        return ResponseEntity.ok(profileResponse);
    }
}
