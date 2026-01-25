package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Arrays;

public class ThirdPartyAuthSecondValueCryptReqDto {
    @JsonProperty("api_type")
    private String apiType;
    @JsonProperty("user_type")
    private String userType;
    @JsonProperty("auth_value")
    private String authValue;
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

    public String getAuthValue() {
        return authValue;
    }

    public void setAuthValue(final String authValue) {
        this.authValue = authValue;
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

    public enum ApiType {
        OTP("otp"),
        GPKI("gpki"),
        EMAIL("email");

        final String value;

        ApiType(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static ApiType fromValue(String value) {
            return Arrays.stream(ApiType.values()).filter(apiType -> apiType.getValue().equals(value)).findFirst().orElse(null);
        }
    }

    @Override
    public String toString() {
        return "ThirdPartyAuthSecondValueCryptReqDto{" +
                "apiType='" + apiType + '\'' +
                ", userType='" + userType + '\'' +
                ", authValue='" + authValue + '\'' +
                ", userName='" + userName + '\'' +
                ", officeNumber='" + officeNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", iv='" + iv + '\'' +
                ", hmac='" + hmac + '\'' +
                '}';
    }
}
