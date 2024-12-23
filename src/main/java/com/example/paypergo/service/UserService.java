package com.example.paypergo.service;

import com.example.paypergo.model.User;
import com.example.paypergo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(String username, String email, String password) {

        if(userRepository.findByUserEmail(email).isPresent()){
            throw new RuntimeException("Email already taken");
        }

        User user = new User();
        user.setUserUsername(username);
        user.setUserEmail(email);
        user.setUserPassword(password);
        return userRepository.save(user);

    }

    public User loginUser(String email, String password) {

        User user = userRepository.findByUserEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Check password
        if (!(password.endsWith(user.getUserPassword()))) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }

    public Optional<User> findByUserId(Long userId) {
        return userRepository.findByUserId(userId);
    }
}
