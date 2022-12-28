package com.hospital.hms.constants.EnumConverter;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.hospital.hms.constants.BloodGroup;

@Converter(autoApply = true)
public class BloodGroupConverter implements AttributeConverter<BloodGroup, String> {

    @Override
    public String convertToDatabaseColumn(BloodGroup bg) {
        if (bg == null) {
            return null;
        }
        return bg.getCode();
    }

    @Override
    public BloodGroup convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(BloodGroup.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}

