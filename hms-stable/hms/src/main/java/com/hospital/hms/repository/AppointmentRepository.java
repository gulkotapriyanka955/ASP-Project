package com.hospital.hms.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hospital.hms.entity.AppointmentEntity;

public interface AppointmentRepository extends CrudRepository<AppointmentEntity, Integer> {

    List<AppointmentEntity> findByPatientId(Integer id);

    List<AppointmentEntity> findByDoctorId(Integer id);
}
