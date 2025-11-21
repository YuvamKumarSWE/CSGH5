package com.backend.service;

import com.backend.dto.GuideDTO;
import com.backend.dto.GuideRequestDTO;

import java.util.List;

public interface GuideService {
    
    List<GuideDTO> findAll();
    
    GuideDTO findById(String id);
    
    GuideDTO save(GuideRequestDTO guideRequestDTO);
    
    GuideDTO update(String id, GuideRequestDTO guideRequestDTO);
    
    void deleteById(String id);
}