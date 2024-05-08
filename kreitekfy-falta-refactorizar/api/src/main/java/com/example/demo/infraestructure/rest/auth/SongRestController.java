package com.example.demo.infraestructure.rest.auth;

import com.example.demo.application.dto.ReproDTO;
import com.example.demo.application.dto.SongDTO;
import com.example.demo.application.dto.UserDto;
import com.example.demo.application.service.ReproductionService;
import com.example.demo.application.service.SongService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SongRestController {
    private SongService songService;
    private ReproductionService reproductionService;


    public SongRestController(SongService songService, ReproductionService reproductionService) {
        this.songService = songService;
        this.reproductionService = reproductionService;

    }

    @GetMapping(value = "/canciones", produces = "application/json")
    public ResponseEntity<Page<SongDTO>> getAllSongs(@RequestParam(value = "filter", required = false) String filter, Pageable pageable){
    Page<SongDTO> songs = this.songService.getSongsByCriteriaStringPaged(pageable, filter);
    return new ResponseEntity<Page<SongDTO>>(songs, HttpStatus.OK);
    }

    @PostMapping(value = "/canciones", produces = "application/json", consumes = "application/json")
    public ResponseEntity<SongDTO> insertSong(@RequestBody SongDTO songDTO){
        SongDTO song = this.songService.saveSong(songDTO);
        return new ResponseEntity<>(song, HttpStatus.CREATED);
    }


    @PatchMapping(value = "/canciones/{songId}", produces = "application/json")
    ResponseEntity<SongDTO> updateSong(@RequestBody SongDTO songDTO){
        SongDTO songUpdated = this.songService.saveSong(songDTO);
        return new ResponseEntity<>(songUpdated, HttpStatus.OK);
    }

    @GetMapping(value = "/canciones/{songId}")
    ResponseEntity<SongDTO> getSongById(@PathVariable Long songId){
        Optional<SongDTO> songDTO = this.songService.getSongById(songId);

        if (songDTO.isPresent()){
            return new ResponseEntity<>(songDTO.get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping(value = "/canciones/{songId}/reproduccion", produces = "application/json")
    public ResponseEntity<ReproDTO> reproduceSong(@PathVariable Long songId,
                                                  @RequestParam String userId,
                                                  @RequestParam String songStyle) {
        Optional<SongDTO> songDTO = this.songService.getSongById(songId);
        if (!songDTO.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ReproDTO reproDTO = new ReproDTO();
        reproDTO.setUserId(userId);
        reproDTO.setSongId(songId);
        reproDTO.setSongStyle(songStyle);

        ReproDTO newRepro = this.reproductionService.registerReproduction(reproDTO);

        return new ResponseEntity<>(newRepro, HttpStatus.CREATED);
    }

    @GetMapping(value = "/reproducciones", produces = "application/json")
    public ResponseEntity<List<ReproDTO>> getReproductions(){
        List<ReproDTO> reproductions = reproductionService.getAllReproductions();
        return ResponseEntity.ok(reproductions);
    }


    @GetMapping(value = "/reproducciones/usuario", produces = "application/json")
    public ResponseEntity<List<ReproDTO>> getReproductionsBySongIdAndUserId(
            @RequestParam Long songId,
            @RequestParam String userId) {

        List<ReproDTO> reproductions = reproductionService.getReproductionsBySongIdAndUserId(songId, userId);

        if (reproductions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(reproductions);
    }


    @GetMapping(value = "/reproducciones/totales/usuario", produces = "application/json")
    public ResponseEntity<List<ReproDTO>> getReproductionsByUserId(@RequestParam String userId) {
        List<ReproDTO> reproductions = reproductionService.getReproductionsByUserId(userId);

        if (reproductions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(reproductions);
    }


    @GetMapping(value = "/reproducciones/historial", produces = "application/json")
    public ResponseEntity<Page<ReproDTO>> getHistory(
            @RequestParam String userId,
            Pageable pageable
    ) {
        Page<ReproDTO> pageOfRepros = reproductionService.getReproductionsByUserIdPaged(userId, pageable);
        return new ResponseEntity<>(pageOfRepros, HttpStatus.OK);
    }

}
