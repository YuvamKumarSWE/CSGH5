package com.backend.controller;

import com.backend.dto.GuideDTO;
import com.backend.dto.GuideRequestDTO;
import com.backend.response.ApiResponse;
import com.backend.service.GuideService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
@RequiredArgsConstructor
public class GuideController {
    
    private final GuideService guideService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<GuideDTO>>> getAllGuides() {
        List<GuideDTO> guides = guideService.findAll();
        ApiResponse<List<GuideDTO>> response = ApiResponse.success(
                guides, 
                "Guides retrieved successfully", 
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GuideDTO>> getGuideById(@PathVariable String id) {
        GuideDTO guide = guideService.findById(id);
        ApiResponse<GuideDTO> response = ApiResponse.success(
                guide, 
                "Guide retrieved successfully", 
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<GuideDTO>> createGuide(@Valid @RequestBody GuideRequestDTO guideRequestDTO) {
        GuideDTO guide = guideService.save(guideRequestDTO);
        ApiResponse<GuideDTO> response = ApiResponse.success(
                guide, 
                "Guide created successfully", 
                HttpStatus.CREATED.value()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GuideDTO>> updateGuide(
            @PathVariable String id, 
            @Valid @RequestBody GuideRequestDTO guideRequestDTO) {
        GuideDTO guide = guideService.update(id, guideRequestDTO);
        ApiResponse<GuideDTO> response = ApiResponse.success(
                guide, 
                "Guide updated successfully", 
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteGuide(@PathVariable String id) {
        guideService.deleteById(id);
        ApiResponse<Void> response = ApiResponse.success(
                null, 
                "Guide deleted successfully", 
                HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }
}