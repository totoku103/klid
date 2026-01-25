package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ThirdPartyAuthPrimaryCryptoReqDto implements Serializable {
    @JsonProperty("api_type")
    private final String apiType = "realtime";
    @JsonProperty("user_id")
    private String userId;
    private String password;
    @JsonProperty("user_type")
    private String userType;
    @JsonProperty("client_ip")
    private String clientIp;
    private String iv;
    private String hmac;

    public String getApiType() {
        return apiType;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(final String userType) {
        this.userType = userType;
    }

    public String getClientIp() {
        return clientIp;
    }

    public void setClientIp(final String clientIp) {
        this.clientIp = clientIp;
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
        return "ThirdPartyAuthReqDto{" +
                "apiType='" + apiType + '\'' +
                ", userId='" + userId + '\'' +
                ", password='" + password + '\'' +
                ", userType='" + userType + '\'' +
                ", clientIp='" + clientIp + '\'' +
                ", iv='" + iv + '\'' +
                ", hmac='" + hmac + '\'' +
                '}';
    }
}
