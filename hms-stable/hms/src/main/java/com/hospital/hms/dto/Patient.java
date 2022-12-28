package com.hospital.hms.dto;

import com.hospital.hms.constants.BloodGroup;
import com.hospital.hms.constants.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Patient {
    private Integer id;
    private String name;
    private Integer age;
    private BloodGroup bloodGroup;
    private Gender gender;
    private String email;
    private String number;
    private User user;
    private CardDetails cardDetails;
}
