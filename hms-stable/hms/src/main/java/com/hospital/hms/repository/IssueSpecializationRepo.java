package com.hospital.hms.repository;

import org.springframework.data.repository.CrudRepository;

import com.hospital.hms.entity.IssueSpecializationEntity;

public interface IssueSpecializationRepo extends CrudRepository<IssueSpecializationEntity, Integer> {

    IssueSpecializationEntity findByIssueId(Integer id);
}
