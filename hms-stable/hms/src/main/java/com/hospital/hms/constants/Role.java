package com.hospital.hms.constants;

public enum Role {
    PATIENT("P"), DOCTOR("D"), ADMIN("A");

    private String code;

    Role(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
