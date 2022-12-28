package com.hospital.hms.constants;

public enum Gender {
    MALE("M"), FEMALE("F"), OTHERS("O");

    private String code;

    Gender(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
