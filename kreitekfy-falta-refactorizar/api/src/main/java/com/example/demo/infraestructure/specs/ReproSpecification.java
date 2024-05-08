package com.example.demo.infraestructure.specs;

import com.example.demo.domain.entity.Reproduction;
import com.example.demo.domain.entity.User;
import com.example.demo.infraestructure.specs.shared.EntitySpecification;
import com.example.demo.infraestructure.specs.shared.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;


public class ReproSpecification extends EntitySpecification<Reproduction> implements Specification<Reproduction> {

    public ReproSpecification(List<SearchCriteria> criteria){
        this.criteria = criteria;
    }
}
