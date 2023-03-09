package com.kimiega.weblab4.security.services;

import com.kimiega.weblab4.entities.User;
import com.kimiega.weblab4.repositories.UserRepository;
import com.kimiega.weblab4.security.jwt.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Objects;

@Component
public class MyUserDetailsService implements UserDetailsService {
    private static final String ROLE_USER = "ROLE_USER";
    @Autowired
    private UserRepository userRepository;
    @Autowired private JWTUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(Objects.isNull(user))
            throw new UsernameNotFoundException("Could not findUser with username = " + username);
        return new org.springframework.security.core.userdetails.User(
                username,
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(ROLE_USER)));
    }

    public void tryAuthenticate(String jwt) {
        String username = jwtUtil.validateTokenAndRetrieveSubject(jwt);
       Authentication authToken = new UsernamePasswordAuthenticationToken(username, jwt, Collections.singletonList(new SimpleGrantedAuthority(ROLE_USER)));
        if(SecurityContextHolder.getContext().getAuthentication() == null){
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }
}