package com.hospital.hms.dto;

import com.hospital.hms.constants.AppointmentStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Appointment {
    private Integer id;
    private Patient patient;
    private Doctor doctor;
    private String prescription;
    private AppointmentStatus status;
    private Issue issue;
    private String date;
    private String time;
}
