package com.hospital.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hms.dto.Appointment;
import com.hospital.hms.repository.AppointmentRepository;
import com.hospital.hms.service.AppointmentService;

@RestController
@RequestMapping("appointment")
public class AppointmentController {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    AppointmentService appointmentService;

    @GetMapping("all")
    public List<Appointment> geAllAppointments() throws Exception {
        return this.appointmentService.getAllAppointments();
    }

    @GetMapping("patient/{id}")
    public List<Appointment> getAppointmentByPatientId(@PathVariable Integer id) throws Exception {
        return this.appointmentService.getAppointmentsByPatientId(id);
    }

    @GetMapping("doctor/{id}")
    public List<Appointment> getAppointmentByDoctorId(@PathVariable Integer id) throws Exception {
        return this.appointmentService.getAppointmentsByDoctorId(id);
    }

    @GetMapping("{id}")
    public Appointment getAppointmentById(@PathVariable Integer id) throws Exception {
        return this.appointmentService.getAppointmentById(id);
    }

    @PostMapping("/save")
    public void saveAppointment(@RequestBody Appointment appointment) throws Exception {
        this.appointmentService.saveAppointment(appointment);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteAppointment(@PathVariable Integer id) {
        this.appointmentService.deleteAppointment(id);
    }
}

