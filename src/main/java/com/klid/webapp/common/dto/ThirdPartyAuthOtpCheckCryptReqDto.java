package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ThirdPartyAuthOtpCheckCryptReqDto {
    @JsonProperty("api_type")
    private String apiType = "otpCheck";
    @JsonProperty("user_type")
    private String userType;
    @JsonProperty("user_name")
    private String userName;
    @JsonProperty("office_number")
    private String officeNumber;
    @JsonProperty("phone_number")
    private String phoneNumber;
    private String iv;
    private String hmac;

    public String getApiType() {
        return apiType;
    }

    public void setApiType(final String apiType) {
        this.apiType = apiType;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(final String userType) {
        this.userType = userType;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    public String getOfficeNumber() {
        return officeNumber;
    }

    public void setOfficeNumber(final String officeNumber) {
        this.officeNumber = officeNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(final String phoneNumber) {
        this.phoneNumber = phoneNumber;
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
}
