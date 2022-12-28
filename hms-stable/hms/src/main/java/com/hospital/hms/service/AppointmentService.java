package com.hospital.hms.service;

import java.util.List;

import com.hospital.hms.dto.Appointment;

public interface AppointmentService {
    List<Appointment> getAllAppointments();

    List<Appointment> getAppointmentsByPatientId(Integer patientId);

    List<Appointment> getAppointmentsByDoctorId(Integer doctorId);

    Appointment saveAppointment(Appointment appointment);

    Appointment getAppointmentById(Integer id);

    void deleteAppointment(Integer id);

    void updateAppointmentsByPatientId(Integer id);

    void updateAppointmentsByDoctorId(Integer id);
}
