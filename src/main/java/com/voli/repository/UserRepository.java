package com.voli.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.voli.controllers.dto.UserRegistrationDto;
import com.voli.model.User;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User save(UserRegistrationDto registration);
    
}
