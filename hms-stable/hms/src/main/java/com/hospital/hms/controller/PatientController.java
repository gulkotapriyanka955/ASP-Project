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

import com.hospital.hms.dto.Patient;
import com.hospital.hms.repository.PatientRepository;
import com.hospital.hms.service.PatientService;

@RestController
@RequestMapping("patient")
public class PatientController {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    PatientService patientService;

    @GetMapping("user/{userId}")
    public Patient getPatientByUserId(@PathVariable Integer userId) throws Exception {
        return this.patientService.getPatientByUserId(userId);
    }

    @GetMapping("{id}")
    public Patient getPatientById(@PathVariable Integer id) throws Exception {
        return this.patientService.getPatientById(id);
    }

    @PostMapping("/save")
    public void savePatient(@RequestBody Patient patient) throws Exception {
        this.patientService.savePatient(patient);
    }

    @GetMapping("/all")
    public List<Patient> getAllPatients() {
        return this.patientService.getAllPatients();
    }

    @DeleteMapping("/delete/{id}")
    public void deletePatient(@PathVariable Integer id) {
        this.patientService.deletePatient(id);
    }
}
