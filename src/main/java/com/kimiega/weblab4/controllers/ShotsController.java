package com.kimiega.weblab4.controllers;

import com.kimiega.weblab4.dto.ShotDTO;
import com.kimiega.weblab4.services.ShotsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/shots")
public class ShotsController {
    @Autowired
    ShotsService shotsService;

    @GetMapping
    List<ShotDTO> getUserShots(Principal principal) {
        return shotsService.getListShots(principal);
    }

    @PostMapping
    ShotDTO addUserShot(@Validated @RequestBody ShotDTO shotDTO, Principal principal) {
        return shotsService.addShot(shotDTO, principal);
    }

    @DeleteMapping
    void deleteUserShots(Principal principal) {
        shotsService.deleteShots(principal);
    }

}
