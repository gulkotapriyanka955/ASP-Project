package com.hospital.hms.constants.EnumConverter;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.hospital.hms.constants.AppointmentStatus;

@Converter(autoApply = true)
public class AppointmentStatusConverter implements AttributeConverter<AppointmentStatus, String> {

    @Override
    public String convertToDatabaseColumn(AppointmentStatus role) {
        if (role == null) {
            return null;
        }
        return role.getCode();
    }

    @Override
    public AppointmentStatus convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(AppointmentStatus.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
