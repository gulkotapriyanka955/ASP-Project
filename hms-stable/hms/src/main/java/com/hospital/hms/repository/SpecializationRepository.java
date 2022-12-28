package com.hospital.hms.repository;

import org.springframework.data.repository.CrudRepository;

import com.hospital.hms.entity.SpecializationEntity;

public interface SpecializationRepository extends CrudRepository<SpecializationEntity, Integer> {
}
