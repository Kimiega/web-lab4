package com.kimiega.weblab4.services;

import com.kimiega.weblab4.dto.ShotDTO;
import com.kimiega.weblab4.entities.Shot;
import com.kimiega.weblab4.repositories.ShotRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@NoArgsConstructor
public class ShotsService {

    @Autowired
    private ShotRepository shotRepository;

    public ShotDTO addShot(ShotDTO shotDTO, Principal principal) {
        Shot shot = new Shot(
                shotDTO.getX(),
                shotDTO.getY(),
                shotDTO.getR(),
                principal.getName()
        );
        return new ShotDTO(shotRepository.save(shot));
    }

    public void deleteShots(Principal principal) {
        shotRepository.deleteByUsername(principal.getName());
    }

    public List<ShotDTO> getListShots(Principal principal) {
        List<Shot> shots = shotRepository.findByUsername(principal.getName());
        List<ShotDTO> shotsDTO = shots.stream().map(ShotDTO::new).toList();
        return shotsDTO;
    }
}
