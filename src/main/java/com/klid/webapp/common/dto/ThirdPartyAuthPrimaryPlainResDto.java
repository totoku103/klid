package com.klid.webapp.common.dto;

public class ThirdPartyAuthPrimaryPlainResDto {
    private String otpKey;
    private String gpkiKey;
    private String email;

    private String userName;
    private String officeNumber;
    private String phoneNumber;

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

    @Override
    public String toString() {
        return "ThirdPartyAuthPrimaryPlainResDto{" +
                "otpKey='" + otpKey + '\'' +
                ", gpkiKey='" + gpkiKey + '\'' +
                ", email='" + email + '\'' +
                ", userName='" + userName + '\'' +
                ", officeNumber='" + officeNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
