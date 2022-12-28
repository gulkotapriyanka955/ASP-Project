package com.hospital.hms.repository;

import org.springframework.data.repository.CrudRepository;

import com.hospital.hms.constants.Role;
import com.hospital.hms.entity.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Integer> {

    UserEntity findByLoginIdAndPasswordAndRole(String loginId, String password, Role role);

    Boolean existsByLoginId(String loginId);

    UserEntity findByLoginId(String email);
}
