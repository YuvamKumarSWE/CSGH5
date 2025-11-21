package com.backend.mapper;

import com.backend.dto.GuideDTO;
import com.backend.dto.GuideRequestDTO;
import com.backend.model.Guide;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class GuideMapper {
    
    public GuideDTO toDTO(Guide guide) {
        if (guide == null) {
            return null;
        }
        
        GuideDTO guideDTO = new GuideDTO();
        guideDTO.setId(guide.getId());
        guideDTO.setContent(guide.getContent());
        
        return guideDTO;
    }
    
    public Guide toEntity(GuideRequestDTO guideRequestDTO) {
        if (guideRequestDTO == null) {
            return null;
        }
        
        Guide guide = new Guide();
        guide.setContent(guideRequestDTO.getContent());
        
        return guide;
    }
    
    public List<GuideDTO> toDTOList(List<Guide> guides) {
        if (guides == null) {
            return new ArrayList<>();
        }
        
        return guides.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public void updateEntityFromDTO(GuideRequestDTO guideRequestDTO, Guide guide) {
        if (guideRequestDTO == null || guide == null) {
            return;
        }
        
        if (guideRequestDTO.getContent() != null) {
            guide.setContent(guideRequestDTO.getContent());
        }
    }
}