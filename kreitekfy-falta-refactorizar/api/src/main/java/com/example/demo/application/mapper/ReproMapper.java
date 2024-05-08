package com.example.demo.application.mapper;

import com.example.demo.application.dto.ReproDTO;
import com.example.demo.domain.entity.Reproduction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReproMapper extends EntityMapper<ReproDTO, Reproduction>{

default Reproduction fromId(Long id){
    if(id == null) return null;
    Reproduction reproduction = new Reproduction();
    reproduction.setId(id);
    return reproduction;
}


}
