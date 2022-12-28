package com.hospital.hms.controller;

import java.util.List;

import com.hospital.hms.dto.DoctorUnavailability;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hms.dto.Doctor;
import com.hospital.hms.service.DoctorService;

@RestController
@RequestMapping("doctor")
public class DoctorController {

    @Autowired
    DoctorService doctorService;

    @PostMapping("/save")
    public void saveDoctor(@RequestBody Doctor doc) throws Exception {
        this.doctorService.saveDoctor(doc);
    }

    @PostMapping("save-unavailability")
    public void saveDoctorUnavailability(@RequestBody DoctorUnavailability doc) throws Exception {
        this.doctorService.saveDoctorUnavailability(doc);
    }

    @GetMapping("user/{userId}")
    public Doctor getDoctorById(@PathVariable Integer userId) throws Exception {
        return this.doctorService.getDoctorByUserId(userId);
    }

    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return this.doctorService.getAllDoctors();
    }

    @GetMapping("/unavailabilities/{id}")
    public List<DoctorUnavailability> getUnavailabilities(@PathVariable Integer id) {
        return this.doctorService.getUnavailabilities(id);
    }

    @GetMapping("issue/{issueId}")
    public List<Doctor> getDoctorsByIssue(@PathVariable Integer issueId) throws Exception {
        return this.doctorService.getDoctorsByIssueId(issueId);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDoctor(@PathVariable Integer id) {
        this.doctorService.deleteDoctor(id);
    }

    @DeleteMapping("/delete-unavailability/{id}")
    public void deleteAvailability(@PathVariable Integer id) {
        this.doctorService.deleteUnavailability(id);
    }
}
