package com.winwin.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDetails {
    private String name;
    private String email;
    private String address;
    private String city;
    private String zipCode;
    private String phone;
}
