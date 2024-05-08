package com.example.demo.application.service.impl;

import com.example.demo.application.dto.SongDTO;
import com.example.demo.application.mapper.SongMapper;
import com.example.demo.application.service.SongService;
import com.example.demo.domain.entity.Song;
import com.example.demo.domain.persistence.SongPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongServiceImpl implements SongService {


    private final SongPersistence songPersistence;
    private final SongMapper songMapper;

    @Autowired
    public SongServiceImpl(SongPersistence songPersistence, SongMapper songMapper) {
        this.songPersistence = songPersistence;
        this.songMapper = songMapper;
    }

    @Override
    public List<SongDTO> getAllSongs() {
        List<Song> songs = this.songPersistence.getAllSongs();
        return songMapper.toDto(songs);
    }

    @Override
    public Optional<SongDTO> getSongById(Long songId) {
        return this.songPersistence.getSongById(songId).map(songMapper::toDto);
    }

    @Override
    public SongDTO saveSong(SongDTO songDTO) {
        Song song = songPersistence.saveSong(this.songMapper.toEntity(songDTO));
        return this.songMapper.toDto(song);
    }

    @Override
    public Page<SongDTO> getSongsByCriteriaStringPaged(Pageable pageable, String filter) {
        Page<Song> songPage = this.songPersistence.findAll(pageable, filter);
        return songPage.map(songMapper::toDto);
    }
}
