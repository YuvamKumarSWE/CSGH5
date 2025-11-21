package com.backend.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    
    private boolean success;
    private String message;
    private List<String> errors;
    private String path;
    private LocalDateTime timestamp;
    private int statusCode;
    
    public ErrorResponse(String message, List<String> errors, String path, int statusCode) {
        this.success = false;
        this.message = message;
        this.errors = errors;
        this.path = path;
        this.timestamp = LocalDateTime.now();
        this.statusCode = statusCode;
    }
    
    public ErrorResponse(String message, String path, int statusCode) {
        this.success = false;
        this.message = message;
        this.path = path;
        this.timestamp = LocalDateTime.now();
        this.statusCode = statusCode;
    }
}