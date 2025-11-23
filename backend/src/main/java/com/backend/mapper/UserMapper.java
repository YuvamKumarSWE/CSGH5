package com.backend.mapper;

import com.backend.dto.UserDTO;
import com.backend.dto.UserRequestDTO;
import com.backend.model.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    @Mapping(target = "guideIds", expression = "java(user.getGuideIds() != null ? new java.util.ArrayList<>(user.getGuideIds()) : new java.util.ArrayList<>())")
    UserDTO toDTO(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "guideIds", expression = "java(new java.util.ArrayList<>())")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toEntity(UserRequestDTO userRequestDTO);

    List<UserDTO> toDTOList(List<User> users);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "guideIds", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromDTO(UserRequestDTO userRequestDTO, @MappingTarget User user);
}

