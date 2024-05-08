package com.example.demo.infraestructure.persistence;

import com.example.demo.domain.entity.Reproduction;
import com.example.demo.domain.entity.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReproductionJpaRepository extends JpaRepository<Reproduction, Long>, JpaSpecificationExecutor<Reproduction> {
    List<Reproduction> findBySongIdAndUserId(Long songId, String userId);
    List<Reproduction> findByUserId(String userId);

    Page<Reproduction> findByUserId(String userId, Pageable pageable);
}
