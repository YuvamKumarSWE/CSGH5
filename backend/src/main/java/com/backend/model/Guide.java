package com.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "guides")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Guide {
    
    @Id
    private String id;
    
    private String content;
}