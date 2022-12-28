package com.hospital.hms.constants;

public enum AppointmentStatus {
    BOOKED("B"), COMPLETED("F"), CANCELLED("C");

    private String code;

    AppointmentStatus(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
