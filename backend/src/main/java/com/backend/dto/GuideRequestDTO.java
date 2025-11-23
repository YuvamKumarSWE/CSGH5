package com.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuideRequestDTO {

    @NotBlank(message = "Content is required")
    private String content;

    private Long userId; // To associate guide with user
}

