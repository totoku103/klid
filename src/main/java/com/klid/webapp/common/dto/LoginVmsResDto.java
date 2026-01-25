package com.klid.webapp.common.dto;

public class LoginVmsResDto {
    private String otpSecretKey;

    private String email;

    private String gpkiKey;

    public String getOtpSecretKey() {
        return otpSecretKey;
    }

    public void setOtpSecretKey(final String otpSecretKey) {
        this.otpSecretKey = otpSecretKey;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getGpkiKey() {
        return gpkiKey;
    }

    public void setGpkiKey(final String gpkiKey) {
        this.gpkiKey = gpkiKey;
    }
}
