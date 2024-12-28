package com.example.paypergo.controller;

import com.example.paypergo.dto.UserDto;
import com.example.paypergo.model.User;
import com.example.paypergo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto) {
        try{
            String msg = userService.registerUser(userDto.getUserUsername(), userDto.getUserEmail(), userDto.getUserPassword());
            return new ResponseEntity<>(msg, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto, HttpSession session, Model model,  HttpServletRequest request) {
        try{
              HttpSession sessionObj = request.getSession();
              System.out.println("Session(controller - login): " + sessionObj.getId());
//            System.out.println("Session(controller - login): " + session.getId());
            String msg = userService.loginUser(userDto.getUserEmail(), userDto.getUserPassword(), session, model,sessionObj);

            return new ResponseEntity<>(msg, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
