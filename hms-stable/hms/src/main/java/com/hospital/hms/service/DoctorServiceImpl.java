package com.hospital.hms.service;

import java.util.ArrayList;
import java.util.List;

import javax.print.Doc;

import com.hospital.hms.dto.DoctorUnavailability;
import com.hospital.hms.entity.DoctorUnavailabilityEntity;
import com.hospital.hms.repository.DoctorUnavailabilityRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.hospital.hms.dto.Appointment;
import com.hospital.hms.dto.Doctor;
import com.hospital.hms.dto.Patient;
import com.hospital.hms.entity.DoctorEntity;
import com.hospital.hms.entity.IssueSpecializationEntity;
import com.hospital.hms.entity.PatientEntity;
import com.hospital.hms.repository.DoctorRepository;
import com.hospital.hms.repository.IssueSpecializationRepo;
import com.hospital.hms.repository.UserRepository;

@Service
public class DoctorServiceImpl implements DoctorService{
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueSpecializationRepo issueSpecializationRepo;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DoctorUnavailabilityRepository unavailabilityRepository;

    // get all doctors for admin login
    @Override
    public List<Doctor> getAllDoctors() {
        ModelMapper modelMapper = new ModelMapper();
        Iterable<DoctorEntity> entities = this.doctorRepository.findAll();
        List<Doctor> doctors = new ArrayList<>();

        entities.forEach(entity -> {
            doctors.add(modelMapper.map(entity, Doctor.class));
        });

        return doctors;
    }

    // get doctor details after doctor login using the id
    @Override
    public Doctor getDoctorByUserId(Integer id) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        DoctorEntity doctorEntity = this.doctorRepository.findByUserId(id);

        if (doctorEntity == null) {
            throw new Exception("doctor with user id" + id + "does not exist");
        }

        return modelMapper.map(doctorEntity, Doctor.class);
    }

    // create or edit a doctor
    @Override
    public void saveDoctor(final Doctor doctor) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        Boolean existsByLoginId = this.userRepository.existsByLoginId(doctor.getUser().getLoginId());

        if (doctor.getId() == null && existsByLoginId) {
            throw new Exception("doctor with login id already exists try with a different login id");
        }
        DoctorEntity entity = modelMapper.map(doctor, DoctorEntity.class);
        this.doctorRepository.save(entity);
    }

    // delete a doctor
    @Override
    public void deleteDoctor(final Integer id) {
        this.appointmentService.updateAppointmentsByDoctorId(id);
        this.doctorRepository.deleteById(id);
    }

    // get doctor who can be consulted based on a certain issue(while booking an appointment)
    @Override
    public List<Doctor> getDoctorsByIssueId(Integer issueId) {
        ModelMapper modelMapper = new ModelMapper();
        IssueSpecializationEntity isEntity = this.issueSpecializationRepo.findByIssueId(issueId);
        List<DoctorEntity> entities = this.doctorRepository.findBySpecializationId(isEntity.getSpecialization().getId());
        List<Doctor> doctors = new ArrayList<>();

        entities.forEach(entity -> {
            doctors.add(modelMapper.map(entity, Doctor.class));
        });

        doctors.forEach(doctor -> {
            List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId(doctor.getId());
            doctor.setAppointments(appointments);
        });

        return doctors;
    }

    @Override
    public List<DoctorUnavailability> getUnavailabilities(Integer id) {
        ModelMapper modelMapper = new ModelMapper();
        List<DoctorUnavailabilityEntity> entities = unavailabilityRepository.findByDoctorId(id);
        List<DoctorUnavailability> unavailabilities = new ArrayList<>();

        entities.forEach(entity -> {
            unavailabilities.add(modelMapper.map(entity, DoctorUnavailability.class));
        });

        return unavailabilities;
    }

    @Override
    public void saveDoctorUnavailability(DoctorUnavailability unavailability) {
        ModelMapper modelMapper = new ModelMapper();
        DoctorUnavailabilityEntity entity = modelMapper.map(unavailability, DoctorUnavailabilityEntity.class);
        unavailabilityRepository.save(entity);
    }

    @Override
    public void deleteUnavailability(Integer id) {
        unavailabilityRepository.deleteById(id);
    }
}
