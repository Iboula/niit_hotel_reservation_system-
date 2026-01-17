package com.hotel.reservation.service;

import com.hotel.reservation.dto.*;
import java.util.List;

/**
 * Service interface for User operations.
 */
public interface UserService {
    UserDTO register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, RegisterRequest request);
    void deleteUser(Long id);
}
