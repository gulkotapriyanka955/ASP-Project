package com.hospital.hms.service;

import java.util.List;

import com.hospital.hms.dto.Patient;

public interface PatientService {

    public List<Patient> getAllPatients();

    public void savePatient(Patient patient) throws Exception;

    public void deletePatient(Integer id);

    Patient getPatientByUserId(Integer id) throws Exception;

    Patient getPatientById(Integer id);
}
