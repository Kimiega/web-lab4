package com.kimiega.weblab4.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Clock;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "weblab4_audit_log")
public class Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private String methodName;

    private LocalDateTime time;

    public Audit(String methodName) {
        this.methodName = methodName;
        this.time = LocalDateTime.now(Clock.systemUTC());
    }

}
