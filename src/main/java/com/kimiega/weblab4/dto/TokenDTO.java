package com.kimiega.weblab4.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class TokenDTO {
    @NonNull
    private String username;
    @NonNull
    private String token;
}
