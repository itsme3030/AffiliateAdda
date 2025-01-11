package com.example.paypergo.service;

import com.example.paypergo.model.User;
import com.example.paypergo.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(String username, String email, String password) {

        if(userRepository.findByUserEmail(email).isPresent()){
            throw new RuntimeException("Email already taken");
        }

        if(userRepository.findByUserUsername(username).isPresent()){
            throw new RuntimeException("Username already taken");
        }

        User user = new User();
        user.setUserUsername(username);
        user.setUserEmail(email);
        user.setUserPassword(password);
        User savedUser = userRepository.save(user);
        return "User created successfully";

    }

    public String loginUser(String email, String password, HttpSession session, Model model,  HttpSession sessionObj) {

        User user = userRepository.findByUserEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Check password
        if (!(password.endsWith(user.getUserPassword()))) {
            throw new RuntimeException("Invalid credentials");
        }

        // Store the userId in the session
//        session.setMaxInactiveInterval(30 * 60); // 30 minutes timeout
//        session.setAttribute("user", user);
//        session.setAttribute("userId", user.getUserId());

        sessionObj.setAttribute("userId", user.getUserId());
        System.out.println("Session ID (Service - loginUser): " + sessionObj.getId());


//        System.out.println("Session ID (Service - loginUser): " + session.getId());

        //Store userId in model
//        model.addAttribute("user", user);
//        model.addAttribute("userId", user.getUserId());

        System.out.println("User logged in successfully : " + user.getUserId());
        return  session.getId();
//        return "User logged in successfully";
    }

    public Optional<User> findByUserId(Long userId) {
        return userRepository.findByUserId(userId);
    }

//    public User validateUser(HttpSession session) {
//        System.out.println("Validating user");
//        if (session == null) {
//            System.out.println("Session is null");
//            return null;
//        }else {
//            System.out.println("Session is valid");
//            User user = (User) session.getAttribute("user");
//            Long userId = (Long) session.getAttribute("userId");
//            return user;
//        }
//    }
}
