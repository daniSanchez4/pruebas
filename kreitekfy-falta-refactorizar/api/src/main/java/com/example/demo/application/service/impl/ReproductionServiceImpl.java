package com.example.demo.application.service.impl;

import com.example.demo.application.dto.ReproDTO;
import com.example.demo.application.mapper.ReproMapper;
import com.example.demo.application.service.ReproductionService;
import com.example.demo.domain.entity.Reproduction;
import com.example.demo.domain.persistence.ReproPersistence;
import com.example.demo.infraestructure.persistence.ReproductionJpaRepository;
import com.example.demo.infraestructure.specs.ReproSpecification;
import com.example.demo.infraestructure.specs.shared.SearchCriteriaHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReproductionServiceImpl implements ReproductionService {

    private ReproductionJpaRepository repository;
    private ReproMapper reproMapper;

    private ReproPersistence reproPersistence;

    @Autowired
    public ReproductionServiceImpl(ReproductionJpaRepository repository, ReproMapper reproMapper, ReproPersistence reproPersistence) {
        this.repository = repository;
        this.reproMapper = reproMapper;
        this.reproPersistence = reproPersistence;
    }

    @Override
    public ReproDTO registerReproduction(ReproDTO reproDTO) {
        Reproduction reproduction = new Reproduction();
        reproduction.setUserId(reproDTO.getUserId());
        reproduction.setSongId(reproDTO.getSongId());
        reproduction.setSongStyle(reproDTO.getSongStyle());

        Reproduction newReproduction = repository.save(reproduction);
        return reproMapper.toDto(newReproduction);

    }

    @Override
    public List<ReproDTO> getAllReproductions(){
        List<Reproduction> reproductions = repository.findAll();
        return reproductions.stream().map(reproMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ReproDTO> getReproductionsBySongIdAndUserId(Long songId, String userId) {
        List<Reproduction> reproductions = repository.findBySongIdAndUserId(songId, userId);
        return reproductions.stream()
                .map(reproMapper::toDto)
                .collect(Collectors.toList());
    }


    @Override
    public List<ReproDTO> getReproductionsByUserId(String userId) {
        List<Reproduction> reproductions = repository.findByUserId(userId);
        return reproductions.stream()
                .map(reproMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<ReproDTO> getReproductionsByUserIdPaged(String userId, Pageable pageable) {
        Page<Reproduction> pageOfReproductions = repository.findByUserId(userId, pageable);
        Page<ReproDTO> repros = pageOfReproductions.map(reproMapper::toDto);
        return repros;
    }



}
