package com.example.demo.infraestructure.persistence;

import com.example.demo.domain.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SongJpaRepository extends JpaRepository<Song, Long>, JpaSpecificationExecutor<Song> {
}
