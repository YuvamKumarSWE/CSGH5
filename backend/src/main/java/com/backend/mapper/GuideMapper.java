package com.backend.mapper;

import com.backend.dto.GuideDTO;
import com.backend.dto.GuideRequestDTO;
import com.backend.model.Guide;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface GuideMapper {

    GuideDTO toDTO(Guide guide);

    @Mapping(target = "id", ignore = true)
    Guide toEntity(GuideRequestDTO guideRequestDTO);

    List<GuideDTO> toDTOList(List<Guide> guides);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDTO(GuideRequestDTO guideRequestDTO, @MappingTarget Guide guide);
}

