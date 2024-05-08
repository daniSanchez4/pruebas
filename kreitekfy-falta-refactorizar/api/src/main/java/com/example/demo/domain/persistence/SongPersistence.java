package com.example.demo.domain.persistence;

import com.example.demo.domain.entity.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface SongPersistence {

    List<Song> getAllSongs();
    Optional<Song> getSongById(Long songId);
    Song saveSong(Song song);
    Page<Song> findAll(Pageable pageable, String filter);
}
