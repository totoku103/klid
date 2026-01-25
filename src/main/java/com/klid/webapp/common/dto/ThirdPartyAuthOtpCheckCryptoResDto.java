package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ThirdPartyAuthOtpCheckCryptoResDto {
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("otp_secret_key")
    private String otpSecretKey;
    private String iv;
    private String hmac;

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
        return "ThirdPartyAuthOtpCheckCryptoResDto{" +
                "userId='" + userId + '\'' +
                ", otpSecretKey='" + otpSecretKey + '\'' +
                ", iv='" + iv + '\'' +
                ", hmac='" + hmac + '\'' +
                '}';
    }
}
