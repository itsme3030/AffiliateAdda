package com.example.paypergo.repository;

import com.example.paypergo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String email);

    Optional<User> findByUserId(Long user_id);

    Optional<Object> findByUserUsername(String username);
}
