package com.kimiega.weblab4.controllers;

import com.kimiega.weblab4.dto.TokenDTO;
import com.kimiega.weblab4.entities.User;
import com.kimiega.weblab4.proxy.Audited;
import com.kimiega.weblab4.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Audited
    @PostMapping("/register")
    public TokenDTO registerHandler(@RequestBody User user){
        return authService.registerUser(user);
    }

    @PostMapping("/login")
    public TokenDTO loginHandler(@RequestBody User user){
        return authService.loginUser(user);
    }
}
