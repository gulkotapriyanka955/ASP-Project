package com.hospital.hms.repository;

import com.hospital.hms.entity.DoctorUnavailabilityEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DoctorUnavailabilityRepository extends CrudRepository<DoctorUnavailabilityEntity, Integer> {
    List<DoctorUnavailabilityEntity> findByDoctorId(Integer id);
}
