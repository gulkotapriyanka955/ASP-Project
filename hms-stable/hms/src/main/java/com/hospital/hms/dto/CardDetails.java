package com.hospital.hms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardDetails {
    private Integer id;
    private String firstName;
    private String lastName;
    private String cardNumber;
    private String cvv;
    private String expiry;
}
