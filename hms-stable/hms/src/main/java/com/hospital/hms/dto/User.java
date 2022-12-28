package com.hospital.hms.dto;

import com.hospital.hms.constants.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Integer id;
    private String loginId;
    private String password;
    private Role role;
}

