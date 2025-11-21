package com.backend.service;

import com.backend.dto.UserDTO;
import com.backend.dto.UserRequestDTO;

import java.util.List;

public interface UserService {
    
    List<UserDTO> findAll();
    
    UserDTO findById(Long id);
    
    UserDTO save(UserRequestDTO userRequestDTO);
    
    UserDTO update(Long id, UserRequestDTO userRequestDTO);
    
    void deleteById(Long id);
    
    UserDTO findByUsername(String username);
    
    UserDTO findByEmail(String email);
}