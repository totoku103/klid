package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;

public class CtrsRedirectCryptoReqDto {
    @JsonProperty("user_name")
    private String userName;
    @JsonProperty("office_number")
    private String officeNumber;
    @JsonProperty("phone_number")
    private String phoneNumber;
    @JsonProperty("system_type")
    private ThirdPartySystemTypes systemType;
    @JsonProperty("client_ip")
    private String clientIp;
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

    public ThirdPartySystemTypes getSystemType() {
        return systemType;
    }

    public void setSystemType(final ThirdPartySystemTypes systemType) {
        this.systemType = systemType;
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
        return "CtrsRedirectCryptoReqDto{" +
                "userName='" + userName + '\'' +
                ", officeNumber='" + officeNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", systemType=" + systemType +
                ", clientIp='" + clientIp + '\'' +
                ", iv='" + iv + '\'' +
                ", hmac='" + hmac + '\'' +
                '}';
    }
}
