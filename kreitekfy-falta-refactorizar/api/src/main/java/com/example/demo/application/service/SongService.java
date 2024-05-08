package com.example.demo.application.service;

import com.example.demo.application.dto.SongDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface SongService {

    List<SongDTO> getAllSongs();

    Optional<SongDTO> getSongById(Long songId);

    SongDTO saveSong(SongDTO songDTO);

    Page<SongDTO> getSongsByCriteriaStringPaged(Pageable pageable, String filter);




}
