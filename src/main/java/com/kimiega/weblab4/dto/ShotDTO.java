package com.kimiega.weblab4.dto;

import com.kimiega.weblab4.entities.Shot;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShotDTO {
    @NonNull
    private Long id;
    @NonNull
    private Double x;

    @NonNull
    private Double y;

    @NonNull
    private Double r;

    private LocalDateTime time;

    private Boolean hit;

    public ShotDTO(Shot shot) {
        id = shot.getId();
        x = shot.getX();
        y = shot.getY();
        r = shot.getR();
        time = shot.getTime();
        hit = shot.getHit();
    }
}
