package com.hospital.hms.service;

import java.util.List;

import com.hospital.hms.dto.Doctor;
import com.hospital.hms.dto.DoctorUnavailability;

public interface DoctorService {
    List<Doctor> getAllDoctors();

    Doctor getDoctorByUserId(Integer id) throws Exception;
    void saveDoctor(Doctor doctor) throws Exception;

    void deleteDoctor(Integer id);

    List<Doctor> getDoctorsByIssueId(Integer issueId);

    List<DoctorUnavailability> getUnavailabilities(Integer id);

    void saveDoctorUnavailability(DoctorUnavailability unavailability);

    void deleteUnavailability(Integer id);
}
