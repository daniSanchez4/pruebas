package com.example.demo.domain.persistence;

import com.example.demo.domain.entity.Reproduction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public interface ReproPersistence {
    Page<Reproduction> findAll(Pageable pageable, String filter);
}
