package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ThirdPartyAuthEmailSendCryptReqDto {
    @JsonProperty("api_type")
    private String apiType = "emailCtrs";
    @JsonProperty("email_address")
    private String emailAddress;
    @JsonProperty("email_code")
    private String emailCode;
    private String iv;
    private String hmac;

    public String getApiType() {
        return apiType;
    }

    public void setApiType(final String apiType) {
        this.apiType = apiType;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(final String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailCode() {
        return emailCode;
    }

    public void setEmailCode(final String emailCode) {
        this.emailCode = emailCode;
    }

    public String getIv() {
        return iv;
    }

    public void setIv(final String iv) {
        this.iv = iv;
    }

    public String getHmac() {
        return hmac;
    }

    public void setHmac(final String hmac) {
        this.hmac = hmac;
    }

    @Override
    public String toString() {
        return "ThirdPartyAuthEmailSendCryptReqDto{" +
                "apiType='" + apiType + '\'' +
                ", emailAddress='" + emailAddress + '\'' +
                ", emailCode='" + emailCode + '\'' +
                ", iv='" + iv + '\'' +
                ", hmac='" + hmac + '\'' +
                '}';
    }
}
