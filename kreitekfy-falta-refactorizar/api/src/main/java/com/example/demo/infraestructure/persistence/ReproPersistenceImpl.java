package com.example.demo.infraestructure.persistence;

import com.example.demo.application.mapper.ReproMapper;
import com.example.demo.domain.entity.Reproduction;
import com.example.demo.domain.persistence.ReproPersistence;
import com.example.demo.infraestructure.specs.ReproSpecification;
import com.example.demo.infraestructure.specs.shared.SearchCriteriaHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class ReproPersistenceImpl implements ReproPersistence {

    private ReproductionJpaRepository repository;
    private ReproMapper reproMapper;

    @Autowired
    public ReproPersistenceImpl(ReproductionJpaRepository repository, ReproMapper reproMapper) {
        this.repository = repository;
        this.reproMapper = reproMapper;
    }

    @Override
    public Page<Reproduction> findAll(Pageable pageable, String filter) {
        ReproSpecification specification = new ReproSpecification(SearchCriteriaHelper.fromFilterString(filter));
        return this.repository.findAll(specification, pageable);
    }
}
