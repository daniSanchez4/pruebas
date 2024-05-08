package com.example.demo.infraestructure.persistence;

import com.example.demo.domain.entity.Song;
import com.example.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserJpaRepository extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {

}
