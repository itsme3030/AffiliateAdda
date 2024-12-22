package com.example.paypergo.service;

import com.example.paypergo.model.User;
import com.example.paypergo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(String username, String email, String password) {

        if(userRepository.findByUserEmail(email).isPresent()){
            throw new RuntimeException("Email already taken");
        }

        User user = new User();
        user.setUser_username(username);
        user.setUser_email(email);
        user.setUser_password(password);
        return userRepository.save(user);

    }

    public User loginUser(String email, String password) {

        User user = userRepository.findByUserEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Check password
        if (!(password.endsWith(user.getUser_password()))) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }
}
