package com.hospital.hms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorUnavailability {
    private Integer id;
    private String date;
    private Doctor doctor;
}
