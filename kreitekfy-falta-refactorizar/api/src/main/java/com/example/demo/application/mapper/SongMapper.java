package com.example.demo.application.mapper;

import com.example.demo.application.dto.SongDTO;
import com.example.demo.domain.entity.Song;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SongMapper extends EntityMapper<SongDTO, Song>{

 default Song fromId(Long id){
     if(id == null) return null;
     Song song = new Song();
     song.setId(id);
     return song;
 }


}
