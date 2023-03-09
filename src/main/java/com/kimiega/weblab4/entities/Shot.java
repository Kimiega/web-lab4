package com.kimiega.weblab4.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kimiega.weblab4.utlis.CheckerHits;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Clock;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "weblab4_shots")
public class Shot {
    @Id
    @SequenceGenerator(name = "weblab4_shot_id_seq", sequenceName = "weblab4_shot_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "weblab4_shot_id_seq")
    @JsonIgnore
    private Long id;

    private Double x;

    private Double y;

    private Double r;

    private LocalDateTime time;

    private Boolean hit;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private String username;

    public Shot(Double x, Double y, Double r, String username) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.username = username;
        this.hit = CheckerHits.check(x, y, r);
        this.time = LocalDateTime.now(Clock.systemUTC());
    }
}
