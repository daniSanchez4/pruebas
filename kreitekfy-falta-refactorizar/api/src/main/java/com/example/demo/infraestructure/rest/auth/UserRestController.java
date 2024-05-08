package com.example.demo.infraestructure.rest.auth;

import com.example.demo.application.dto.UserDto;
import com.example.demo.application.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserRestController {

    private AuthService authService;

    public UserRestController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        UserDto user = authService.getUser(username).orElseThrow();
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/users/{username}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto updatedUser) {
        try {
            UserDto updatedUserDto = authService.updateUser(updatedUser);
            return ResponseEntity.ok(updatedUserDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }





}
