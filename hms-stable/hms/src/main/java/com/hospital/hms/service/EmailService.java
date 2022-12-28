package com.hospital.hms.service;

import com.hospital.hms.dto.EmailDetails;

public interface EmailService {
    String sendEmail(EmailDetails emailDetails);
}
