package com.hospital.hms.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hospital.hms.entity.DoctorEntity;

public interface DoctorRepository extends CrudRepository<DoctorEntity, Integer> {

    DoctorEntity findByUserId(Integer id);

    List<DoctorEntity> findBySpecializationId(Integer id);
}
