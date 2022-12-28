package com.hospital.hms.repository;

import org.springframework.data.repository.CrudRepository;

import com.hospital.hms.entity.IssueEntity;

public interface IssueRepository extends CrudRepository<IssueEntity, Integer> {
}
