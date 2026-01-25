package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;

public class ThirdPartyOtpInitializeCryptoReqDto {
    @JsonProperty("user_name")
    private String userName;
    @JsonProperty("office_number")
    private String officeNumber;
    @JsonProperty("phone_number")
    private String phoneNumber;
    @JsonProperty("req_user_id")
    private String reqUserId;
    @JsonProperty("req_user_name")
    private String reqUserName;
    @JsonProperty("system_type")
    private ThirdPartySystemTypes systemType;

    private String iv;
    private String hmac;

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

    public String getReqUserId() {
        return reqUserId;
    }

    public void setReqUserId(final String reqUserId) {
        this.reqUserId = reqUserId;
    }

    public String getReqUserName() {
        return reqUserName;
    }

    public void setReqUserName(final String reqUserName) {
        this.reqUserName = reqUserName;
    }

    public ThirdPartySystemTypes getSystemType() {
        return systemType;
    }

    public void setSystemType(final ThirdPartySystemTypes systemType) {
        this.systemType = systemType;
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
        return "ThirdPartyOtpInitializeCryptoReqDto{" +
                "userName='" + userName + '\'' +
                ", officeNumber='" + officeNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", reqUserId='" + reqUserId + '\'' +
                ", reqUserName='" + reqUserName + '\'' +
                ", systemType=" + systemType +
                ", iv='" + iv + '\'' +
                ", hmac='" + hmac + '\'' +
                '}';
    }
}
