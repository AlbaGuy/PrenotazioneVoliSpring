package  com.voli.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import  com.voli.controllers.dto.UserRegistrationDto;
import com.voli.model.User;

public interface UserService extends UserDetailsService {

    User findByEmail(String email);

    User save(UserRegistrationDto registration);
}
