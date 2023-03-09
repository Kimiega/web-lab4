package com.kimiega.weblab4.repositories;

import com.kimiega.weblab4.entities.Shot;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShotRepository extends JpaRepository<Shot, Long> {
    List<Shot> findByUsername(String username);
    @Transactional(rollbackOn=DataAccessException.class)
    long deleteByUsername(String username);

}
