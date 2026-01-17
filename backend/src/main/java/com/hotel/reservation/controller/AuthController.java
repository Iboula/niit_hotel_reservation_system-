package com.hotel.reservation.controller;

import com.hotel.reservation.dto.LoginRequest;
import com.hotel.reservation.dto.LoginResponse;
import com.hotel.reservation.dto.RegisterRequest;
import com.hotel.reservation.dto.UserDTO;
import com.hotel.reservation.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for authentication operations.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Register a new user.
     *
     * @param request the registration request
     * @return the created user DTO
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody RegisterRequest request) {
        UserDTO userDTO = userService.register(request);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    /**
     * Login a user.
     *
     * @param request the login request
     * @return the login response with token
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }
}
