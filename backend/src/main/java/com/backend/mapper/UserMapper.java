package com.backend.mapper;

import com.backend.dto.UserDTO;
import com.backend.dto.UserRequestDTO;
import com.backend.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    
    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setGuideIds(user.getGuideIds() != null ? new ArrayList<>(user.getGuideIds()) : new ArrayList<>());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        
        return userDTO;
    }
    
    public User toEntity(UserRequestDTO userRequestDTO) {
        if (userRequestDTO == null) {
            return null;
        }
        
        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(userRequestDTO.getPassword());
        user.setGuideIds(new ArrayList<>());
        
        return user;
    }
    
    public List<UserDTO> toDTOList(List<User> users) {
        if (users == null) {
            return new ArrayList<>();
        }
        
        return users.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public void updateEntityFromDTO(UserRequestDTO userRequestDTO, User user) {
        if (userRequestDTO == null || user == null) {
            return;
        }
        
        if (userRequestDTO.getUsername() != null) {
            user.setUsername(userRequestDTO.getUsername());
        }
        if (userRequestDTO.getEmail() != null) {
            user.setEmail(userRequestDTO.getEmail());
        }
        if (userRequestDTO.getPassword() != null) {
            user.setPassword(userRequestDTO.getPassword());
        }
    }
}