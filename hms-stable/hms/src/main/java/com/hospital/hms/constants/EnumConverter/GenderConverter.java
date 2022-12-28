package com.hospital.hms.constants.EnumConverter;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.hospital.hms.constants.Gender;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<Gender, String> {

    @Override
    public String convertToDatabaseColumn(Gender role) {
        if (role == null) {
            return null;
        }
        return role.getCode();
    }

    @Override
    public Gender convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(Gender.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
