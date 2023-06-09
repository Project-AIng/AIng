package com.hansung.Aing.repository;

import com.hansung.Aing.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByName(String name);

    boolean existsByEmail(String email);

    User findByName(String name);

    Optional<User> findByEmail(String email);

    User findByEmailAndPassword(String email, String password);
}
