package com.backend.service.impl;

import com.backend.dto.UserDTO;
import com.backend.dto.UserRequestDTO;
import com.backend.exception.DatabaseOperationException;
import com.backend.exception.DuplicateResourceException;
import com.backend.exception.ResourceNotFoundException;
import com.backend.mapper.UserMapper;
import com.backend.model.User;
import com.backend.repository.UserRepository;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        try {
            log.info("Fetching all users");
            List<User> users = userRepository.findAll();
            return users.stream()
                    .map(userMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (DataAccessException e) {
            log.error("Error fetching all users", e);
            throw new DatabaseOperationException("Failed to fetch users", e);
        }
    }
    
    @Override
    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        log.info("Fetching user with id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return userMapper.toDTO(user);
    }
    
    @Override
    public UserDTO save(UserRequestDTO userRequestDTO) {
        log.info("Creating new user with username: {}", userRequestDTO.getUsername());
        
        // Check for duplicate username
        if (userRepository.findByUsername(userRequestDTO.getUsername()).isPresent()) {
            throw new DuplicateResourceException("User", "username", userRequestDTO.getUsername());
        }
        
        // Check for duplicate email
        if (userRepository.findByEmail(userRequestDTO.getEmail()).isPresent()) {
            throw new DuplicateResourceException("User", "email", userRequestDTO.getEmail());
        }
        
        try {
            User user = userMapper.toEntity(userRequestDTO);
            User savedUser = userRepository.save(user);
            log.info("User created successfully with id: {}", savedUser.getId());
            return userMapper.toDTO(savedUser);
        } catch (DataAccessException e) {
            log.error("Error saving user", e);
            throw new DatabaseOperationException("Failed to save user", e);
        }
    }
    
    @Override
    public UserDTO update(Long id, UserRequestDTO userRequestDTO) {
        log.info("Updating user with id: {}", id);
        
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        // Check for duplicate username if username is being changed
        if (!existingUser.getUsername().equals(userRequestDTO.getUsername())) {
            if (userRepository.findByUsername(userRequestDTO.getUsername()).isPresent()) {
                throw new DuplicateResourceException("User", "username", userRequestDTO.getUsername());
            }
            existingUser.setUsername(userRequestDTO.getUsername());
        }
        
        // Check for duplicate email if email is being changed
        if (!existingUser.getEmail().equals(userRequestDTO.getEmail())) {
            if (userRepository.findByEmail(userRequestDTO.getEmail()).isPresent()) {
                throw new DuplicateResourceException("User", "email", userRequestDTO.getEmail());
            }
            existingUser.setEmail(userRequestDTO.getEmail());
        }
        
        // Update password if provided
        if (userRequestDTO.getPassword() != null && !userRequestDTO.getPassword().isEmpty()) {
            existingUser.setPassword(userRequestDTO.getPassword());
        }
        
        try {
            User updatedUser = userRepository.save(existingUser);
            log.info("User updated successfully with id: {}", updatedUser.getId());
            return userMapper.toDTO(updatedUser);
        } catch (DataAccessException e) {
            log.error("Error updating user", e);
            throw new DatabaseOperationException("Failed to update user", e);
        }
    }
    
    @Override
    public void deleteById(Long id) {
        log.info("Deleting user with id: {}", id);
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
            userRepository.delete(user);
            log.info("User deleted successfully with id: {}", id);
        } catch (DataAccessException e) {
            log.error("Error deleting user", e);
            throw new DatabaseOperationException("Failed to delete user", e);
        }
    }
    
    @Override
    @Transactional(readOnly = true)
    public UserDTO findByUsername(String username) {
        log.info("Fetching user with username: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        return userMapper.toDTO(user);
    }
    
    @Override
    @Transactional(readOnly = true)
    public UserDTO findByEmail(String email) {
        log.info("Fetching user with email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return userMapper.toDTO(user);
    }
}