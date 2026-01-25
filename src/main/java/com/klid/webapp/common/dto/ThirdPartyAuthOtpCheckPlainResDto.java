package com.klid.webapp.common.dto;

public class ThirdPartyAuthOtpCheckPlainResDto {
    private String userId;
    private String otpSecretKey;

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public String getOtpSecretKey() {
        return otpSecretKey;
    }

    public void setOtpSecretKey(final String otpSecretKey) {
        this.otpSecretKey = otpSecretKey;
    }
}
