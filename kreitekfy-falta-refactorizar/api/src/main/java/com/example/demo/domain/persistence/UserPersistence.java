package com.example.demo.domain.persistence;

import com.example.demo.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserPersistence {
    User save(User user);
    Optional<User> find(String username);

}
