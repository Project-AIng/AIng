package com.hansung.Aing.service;

import com.hansung.Aing.model.User;
import com.hansung.Aing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {Optional<com.hansung.Aing.model.User> userOptional = userRepository.findByEmail(userEmail);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userEmail));

        return user;
    }
}
