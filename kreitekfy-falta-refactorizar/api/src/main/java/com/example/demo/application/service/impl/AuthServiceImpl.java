package com.example.demo.application.service.impl;

import com.example.demo.application.mapper.UserMapper;
import com.example.demo.application.service.AuthService;
import com.example.demo.application.dto.UserDto;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.persistence.UserPersistence;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserPersistence userPersistence;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    public AuthServiceImpl(UserPersistence userPersistence, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userPersistence = userPersistence;
        this.userMapper = userMapper;

        this.passwordEncoder = passwordEncoder;
    }

    public UserDto register(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        return userMapper.toDto(userPersistence.save(user));
    }

    @Override
    public Optional<UserDto> getUser(String username) {
        Optional<User> user = userPersistence.find(username);
        if (user.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(userMapper.toDto(user.get()));
    }

    @Override
    public UserDto updateUser(UserDto updatedUser) {
        Optional<User> optionalUser = userPersistence.find(updatedUser.getUsername());
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());

            if (updatedUser.getPassword().equals(user.getPassword()) || passwordEncoder.matches(updatedUser.getPassword(), user.getPassword())) {
                user.setPassword(user.getPassword());
            } else {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            user.setRole(updatedUser.getRole());

            User savedUser = userPersistence.save(user);
            return userMapper.toDto(savedUser);
        } else {
            throw new IllegalArgumentException("Usuario no encontrado");
        }
    }




}
