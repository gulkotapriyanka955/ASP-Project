package com.hospital.hms.repository;

import org.springframework.data.repository.CrudRepository;

import com.hospital.hms.dto.User;
import com.hospital.hms.entity.PasswordResetTokenEntity;

public interface PasswordResetTokenRepo extends CrudRepository<PasswordResetTokenEntity, Integer> {
    PasswordResetTokenEntity findByResetToken(String token);

    Boolean existsByUser(User user);
}
