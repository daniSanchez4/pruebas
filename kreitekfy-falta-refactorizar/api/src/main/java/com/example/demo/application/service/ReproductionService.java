package com.example.demo.application.service;

import com.example.demo.application.dto.ReproDTO;
import com.example.demo.domain.entity.Reproduction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReproductionService {
    ReproDTO registerReproduction(ReproDTO reproDTO);

    List<ReproDTO> getAllReproductions();

    public List<ReproDTO> getReproductionsBySongIdAndUserId(Long songId, String userId);

    List<ReproDTO> getReproductionsByUserId(String userId);

    public Page<ReproDTO> getReproductionsByUserIdPaged(String userId, Pageable pageable);


}
