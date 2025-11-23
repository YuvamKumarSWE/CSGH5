package com.backend.controller;

import com.backend.dto.UserDTO;
import com.backend.dto.UserRequestDTO;
import com.backend.response.ApiResponse;
import com.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "User management endpoints")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Get all users")
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> users = userService.findAll();
        ApiResponse<List<UserDTO>> response = ApiResponse.success(
                users,
                "Users retrieved successfully",
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get user by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {
        UserDTO user = userService.findById(id);
        ApiResponse<UserDTO> response = ApiResponse.success(
                user,
                "User retrieved successfully",
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get user by username")
    @GetMapping("/username/{username}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByUsername(@PathVariable String username) {
        UserDTO user = userService.findByUsername(username);
        ApiResponse<UserDTO> response = ApiResponse.success(
                user,
                "User retrieved successfully",
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get user by email")
    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByEmail(@PathVariable String email) {
        UserDTO user = userService.findByEmail(email);
        ApiResponse<UserDTO> response = ApiResponse.success(
                user,
                "User retrieved successfully",
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Create a new user")
    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        UserDTO user = userService.save(userRequestDTO);
        ApiResponse<UserDTO> response = ApiResponse.success(
                user,
                "User created successfully",
                HttpStatus.CREATED.value()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Update user by ID")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO userRequestDTO) {
        UserDTO user = userService.update(id, userRequestDTO);
        ApiResponse<UserDTO> response = ApiResponse.success(
                user,
                "User updated successfully",
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete user by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        ApiResponse<Void> response = ApiResponse.success(
                null,
                "User deleted successfully",
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }
}

