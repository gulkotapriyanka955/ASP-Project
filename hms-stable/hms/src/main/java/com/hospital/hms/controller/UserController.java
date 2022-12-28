package com.hospital.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hms.dto.EmailDetails;
import com.hospital.hms.dto.User;
import com.hospital.hms.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User login(@RequestBody User user) throws Exception {
        return this.userService.login(user);
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody String email) throws Exception {
        this.userService.forgotPassword(email);
    }

    @GetMapping("/reset-token/{token}")
    public User getUserById(@PathVariable String token) {
        return this.userService.getUserByToken(token);
    }

    @PostMapping("/save")
    public User save(@RequestBody User user) throws Exception {
        return this.userService.save(user);

    }
}
