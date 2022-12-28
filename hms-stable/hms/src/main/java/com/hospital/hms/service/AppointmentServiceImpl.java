package com.hospital.hms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.hospital.hms.constants.AppointmentStatus;
import com.hospital.hms.dto.EmailDetails;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.hms.dto.Appointment;
import com.hospital.hms.entity.AppointmentEntity;
import com.hospital.hms.entity.PatientEntity;
import com.hospital.hms.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService{

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public List<Appointment> getAllAppointments() {
        ModelMapper modelMapper = new ModelMapper();
        Iterable<AppointmentEntity> entities  = this.appointmentRepository.findAll();
        List<Appointment> appointments = new ArrayList<>();

        entities.forEach(entity -> {
            appointments.add(modelMapper.map(entity, Appointment.class));
        });
        return appointments;
    }

    // to get the list of appointments booked by patient
    @Override
    public List<Appointment> getAppointmentsByPatientId(Integer patientId) {
        ModelMapper modelMapper = new ModelMapper();
        Iterable<AppointmentEntity> entities  = this.appointmentRepository.findByPatientId(patientId);
        List<Appointment> appointments = new ArrayList<>();

        entities.forEach(entity -> {
            appointments.add(modelMapper.map(entity, Appointment.class));
        });
        return appointments;
    }

    // to get the list of appointments a doctor has
    @Override
    public List<Appointment> getAppointmentsByDoctorId(Integer doctorId) {
        ModelMapper modelMapper = new ModelMapper();
        Iterable<AppointmentEntity> entities  = this.appointmentRepository.findByDoctorId(doctorId);
        List<Appointment> appointments = new ArrayList<>();

        entities.forEach(entity -> {
            appointments.add(modelMapper.map(entity, Appointment.class));
        });
        return appointments;
    }

    // to create a new appointment
    @Override
    public Appointment saveAppointment(Appointment appointment) {
        ModelMapper modelMapper = new ModelMapper();
        AppointmentEntity entity = modelMapper.map(appointment, AppointmentEntity.class);
        entity = this.appointmentRepository.save(entity);

        if (appointment.getStatus() == AppointmentStatus.BOOKED && appointment.getPrescription() == null) {
            this.sendBookingEmail(entity.getDoctor().getEmail(), "An Appointment has been scheduled on " + entity.getDate() + " at " + entity.getTime(), "HMS: Appointment Scheduled");
            this.sendBookingEmail(entity.getPatient().getEmail(), "An Appointment with dr." + entity.getDoctor().getName() + "has been booked and scheduled on " + entity.getDate() + " at " + entity.getTime(), "HMS: Appointment Booked Successfully");
        }

        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            this.sendBookingEmail(entity.getDoctor().getEmail(), "Appointment scheduled on " + entity.getDate() + " at " + entity.getTime() + " has been cancelled", "HMS: Appointment Cancelled");
            this.sendBookingEmail(entity.getPatient().getEmail(), "Appointment scheduled on " + entity.getDate() + " at " + entity.getTime() + " has been cancelled", "HMS: Appointment Cancelled");
        }

        return modelMapper.map(entity, Appointment.class);
    }

    // to get individual appointment for editing it
    @Override
    public Appointment getAppointmentById(Integer id) {
        ModelMapper modelMapper = new ModelMapper();
        Optional<AppointmentEntity> entity = this.appointmentRepository.findById(id);

        return modelMapper.map(entity.get(), Appointment.class);
    }

    // update an appointment booked by a patient
    @Override
    public void updateAppointmentsByPatientId(Integer id) {
        Iterable<AppointmentEntity> entities  = this.appointmentRepository.findByPatientId(id);

        entities.forEach(entity -> {
            entity.setPatient(null);
        });

        appointmentRepository.saveAll(entities);
    }

    // update an appointment i.e to add/edit prescription
    @Override
    public void updateAppointmentsByDoctorId(Integer id) {
        Iterable<AppointmentEntity> entities  = this.appointmentRepository.findByDoctorId(id);

        entities.forEach(entity -> {
            entity.setDoctor(null);
        });

        appointmentRepository.saveAll(entities);
    }

    @Override
    public void deleteAppointment(final Integer id) {
        appointmentRepository.deleteById(id);
    }

    public void sendBookingEmail(String email, String body, String subject) {
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);
        emailDetails.setMsgBody(body);
        emailDetails.setSubject(subject);
        emailService.sendEmail(emailDetails);
    }
}
