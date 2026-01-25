package com.klid.webapp.common.dto;

import com.klid.webapp.common.enums.ThirdPartySystemTypes;

import java.io.Serializable;

public class IntegrationLoginInfoDto implements Serializable {
    private String userName;
    private String officeNumber;
    private String plainPhoneNumber;
    private String clientIp;
    private ThirdPartySystemTypes systemType;

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

    public String getPlainPhoneNumber() {
        return plainPhoneNumber;
    }

    public void setPlainPhoneNumber(final String plainPhoneNumber) {
        this.plainPhoneNumber = plainPhoneNumber;
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

    public String getPk() {
        return getUserName() + " " + getOfficeNumber() + " " + getPlainPhoneNumber() + " " + getClientIp();
    }

    @Override
    public String toString() {
        return "IntegrationLoginInfoDto{" +
                "userName='" + userName + '\'' +
                ", officeNumber='" + officeNumber + '\'' +
                ", plainPhoneNumber='" + plainPhoneNumber + '\'' +
                ", clientIp='" + clientIp + '\'' +
                ", systemType=" + systemType +
                '}';
    }
}
