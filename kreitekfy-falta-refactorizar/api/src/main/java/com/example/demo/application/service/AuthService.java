package com.example.demo.application.service;

import com.example.demo.application.dto.UserDto;

import java.util.Optional;

public interface AuthService {
    public UserDto register(UserDto userDto);
    Optional<UserDto> getUser(String username);

    public UserDto updateUser(UserDto userDto);

}
