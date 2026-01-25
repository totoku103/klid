package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ThirdPartyAuthPrimaryCryptoResDto {
    @JsonProperty("otp_key")
    private String otpKey;
    @JsonProperty("gpki_key")
    private String gpkiKey;
    private String email;
    @JsonProperty("user_name")
    private String userName;
    @JsonProperty("office_number")
    private String officeNumber;
    @JsonProperty("phone_number")
    private String phoneNumber;

    private String iv;
    private String hmac;

    public String getOtpKey() {
        return otpKey;
    }

    public void setOtpKey(final String otpKey) {
        this.otpKey = otpKey;
    }

    public String getGpkiKey() {
        return gpkiKey;
    }

    public void setGpkiKey(final String gpkiKey) {
        this.gpkiKey = gpkiKey;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
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

    @Override
    public String toString() {
        return "ThirdPartyAuthPrimaryCryptoResDto{" +
                "otpKey='" + otpKey + '\'' +
                ", gpkiKey='" + gpkiKey + '\'' +
                ", email='" + email + '\'' +
                ", userName='" + userName + '\'' +
                ", officeNumber='" + officeNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", iv='" + iv + '\'' +
                ", hmac='" + hmac + '\'' +
                '}';
    }
}
