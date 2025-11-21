package com.backend.repository;

import com.backend.model.Guide;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuideRepository extends MongoRepository<Guide, String> {
    
}