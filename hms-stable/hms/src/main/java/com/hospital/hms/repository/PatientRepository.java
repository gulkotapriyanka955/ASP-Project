package com.hospital.hms.repository;

import org.springframework.data.repository.CrudRepository;

import com.hospital.hms.entity.PatientEntity;

public interface PatientRepository extends CrudRepository<PatientEntity, Integer> {

    PatientEntity findByUserId(Integer id);
}
