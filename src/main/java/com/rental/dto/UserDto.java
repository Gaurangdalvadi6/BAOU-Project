package com.rental.dto;

import com.rental.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private  Long id;

    private  String name;

    private String email;

    private UserRole userRole;
}
