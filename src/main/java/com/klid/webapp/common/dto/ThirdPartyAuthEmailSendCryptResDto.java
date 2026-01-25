package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ThirdPartyAuthEmailSendCryptResDto {
    @JsonProperty("email_sent")
    private String emailSent;

    public String getEmailSent() {
        return emailSent;
    }

    public void setEmailSent(final String emailSent) {
        this.emailSent = emailSent;
    }

    @Override
    public String toString() {
        return "ThirdPartyAuthEmailSendCryptResDto{" +
                "emailSent='" + emailSent + '\'' +
                '}';
    }
}
