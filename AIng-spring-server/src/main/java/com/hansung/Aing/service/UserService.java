package com.hansung.Aing.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hansung.Aing.model.User;
import com.hansung.Aing.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void signUp(User user) throws Exception {
        // 이름 유효성 검사
        if (!isValidName(user.getName())) {
            throw new Exception("이름은 2글자에서 6글자 사이여야 합니다.");
        }

        // 이메일 유효성 검사
        if (!isValidEmail(user.getEmail())) {
            throw new Exception("이메일 형식에 맞게 입력해주세요.");
        }

        // 비밀번호 유효성 검사
        if (!isValidPassword(user.getPassword())) {
            throw new Exception("비밀번호는 최소 8글자 이상이어야 합니다.");
        }

        // 중복된 이름이나 이메일이 있는지 검사
        if (userRepository.existsByName(user.getName())) {
            throw new Exception("이미 사용중인 이름입니다.");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("이미 사용중인 이메일입니다.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    // 이름 유효성 검사 메소드
    private boolean isValidName(String name) {
        if (name == null || name.length() < 2 || name.length() > 6) {
            return false;
        }
        return true;
    }

    // 이메일 유효성 검사 메소드
    private boolean isValidEmail(String email) {
        if (email == null || email.length() == 0) {
            return false;
        }

        // 이메일 형식 검사를 위한 정규표현식
        String regex = "^[_a-zA-Z0-9-\\.]+@[\\.a-zA-Z0-9-]+\\.[a-zA-Z]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }

    // 비밀번호 유효성 검사 메소드
    private boolean isValidPassword(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        return true;
    }

    public User login(User user) throws Exception {
        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new Exception("일치하는 사용자 정보가 없습니다."));

        // Verify the password
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }

        return existingUser;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}

