package com.hospital.hms.constants;

public enum BloodGroup {
    A_POSITIVE("AP"), B_POSITIVE("BP"), A_NEGATIVE("AN"), B_NEGATIVE("BN"), O_NEGATIVE("ON"), O_POSITIVE("OP"), AB_NEGATIVE("ABN"),
    AB_POSITIVE("ABP");

    private String code;

    BloodGroup(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
