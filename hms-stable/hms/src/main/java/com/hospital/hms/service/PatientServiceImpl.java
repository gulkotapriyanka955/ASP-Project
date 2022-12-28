package com.hospital.hms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.hms.dto.Patient;
import com.hospital.hms.entity.PatientEntity;
import com.hospital.hms.repository.PasswordResetTokenRepo;
import com.hospital.hms.repository.PatientRepository;
import com.hospital.hms.repository.UserRepository;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentService appointmentService;

    // get all patients for admin login
    @Override
    public List<Patient> getAllPatients() {
        ModelMapper modelMapper = new ModelMapper();
        Iterable<PatientEntity> entities = this.patientRepository.findAll();
        List<Patient> patients = new ArrayList<>();

        entities.forEach(entity -> {
            patients.add(modelMapper.map(entity, Patient.class));
        });

        return patients;
    }

    // save/update a patient
    @Override
    public void savePatient(final Patient patient) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        Boolean existsByLoginId = this.userRepository.existsByLoginId(patient.getUser().getLoginId());

        if (patient.getId() == null && existsByLoginId) {
            throw new Exception("patient with login id already exists try with a different login id");
        }
        PatientEntity entity = modelMapper.map(patient, PatientEntity.class);
        patientRepository.save(entity);
    }

    //delete a patient
    @Override
    public void deletePatient(final Integer id) {
        this.appointmentService.updateAppointmentsByPatientId(id);
        this.patientRepository.deleteById(id);
    }

    // get patient details after login
    @Override
    public Patient getPatientByUserId(Integer id) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PatientEntity patientEntity = this.patientRepository.findByUserId(id);

        if (patientEntity == null) {
            throw new Exception("patient with user id" + id + "does not exist");
        }

        return modelMapper.map(patientEntity, Patient.class);
    }

    // get patient details after login
    @Override
    public Patient getPatientById(Integer id) {
        ModelMapper modelMapper = new ModelMapper();
        Optional<PatientEntity> patientEntity = this.patientRepository.findById(id);

        return modelMapper.map(patientEntity.get(), Patient.class);
    }
}
