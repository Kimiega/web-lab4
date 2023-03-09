package com.kimiega.weblab4.services;

import com.kimiega.weblab4.dto.TokenDTO;
import com.kimiega.weblab4.entities.User;
import com.kimiega.weblab4.repositories.UserRepository;
import com.kimiega.weblab4.security.jwt.JWTUtil;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    public TokenDTO registerUser(User user) {
        String encodedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPass);
        user = userRepository.save(user);
        String tokenString = jwtUtil.generateToken(user.getUsername());
        return new TokenDTO(user.getUsername(), tokenString);
    }
    public TokenDTO loginUser(User user) {
        UsernamePasswordAuthenticationToken authInputToken =
        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        authenticationManager.authenticate(authInputToken);
        String tokenString = jwtUtil.generateToken(user.getUsername());
        return new TokenDTO(user.getUsername(), tokenString);
    }

}
