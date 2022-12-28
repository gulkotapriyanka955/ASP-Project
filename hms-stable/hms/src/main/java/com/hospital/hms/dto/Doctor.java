package com.hospital.hms.dto;

import java.util.List;

import com.hospital.hms.constants.Gender;
import com.hospital.hms.entity.DoctorUnavailabilityEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Doctor {
    private Integer id;
    private String name;
    private Integer age;
    private Gender gender;
    private String email;
    private String number;
    private Double fee;
    private Specialization specialization;
    private User user;
    private List<Appointment> appointments;
    private List<DoctorUnavailability> unavailabilities;
}
