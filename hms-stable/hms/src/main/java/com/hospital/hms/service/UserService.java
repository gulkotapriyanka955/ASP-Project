package com.hospital.hms.service;

import com.hospital.hms.dto.EmailDetails;
import com.hospital.hms.dto.User;

public interface UserService {

    User login(User user) throws Exception;

    void forgotPassword(String email) throws Exception;

    User getUserByToken(String token);

    User save(User user);
}
