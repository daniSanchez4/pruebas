package com.example.demo.infraestructure.persistence;

import com.example.demo.domain.entity.Song;
import com.example.demo.domain.persistence.SongPersistence;
import com.example.demo.infraestructure.specs.SongSpecification;
import com.example.demo.infraestructure.specs.shared.SearchCriteriaHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SongPersistenceImpl implements SongPersistence {

    private final SongJpaRepository repository;

    public SongPersistenceImpl(SongJpaRepository repository) {
        this.repository = repository;
    }


    @Override
    public List<Song> getAllSongs() {
        return this.repository.findAll();
    }

    @Override
    public Optional<Song> getSongById(Long songId) {
        return this.repository.findById(songId);
    }

    @Override
    public Song saveSong(Song song) {
        return this.repository.save(song);
    }

    @Override
    public Page<Song> findAll(Pageable pageable, String filter) {
        SongSpecification specification = new SongSpecification(SearchCriteriaHelper.fromFilterString(filter));
        return this.repository.findAll(specification, pageable);
    }
}
