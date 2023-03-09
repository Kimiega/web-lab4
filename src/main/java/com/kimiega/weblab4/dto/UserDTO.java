package com.kimiega.weblab4.dto;

import lombok.Data;
import lombok.NonNull;

@Data
public class UserDTO {
    @NonNull
    private String username;

    @NonNull
    private String password;
}

