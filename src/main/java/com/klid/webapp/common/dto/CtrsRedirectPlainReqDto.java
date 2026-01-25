package com.klid.webapp.common.dto;

import com.klid.webapp.common.enums.ThirdPartySystemTypes;

public class CtrsRedirectPlainReqDto {
    private String userName;
    private String officeNumber;
    private String phoneNumber;
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(final String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getClientIp() {
        return clientIp;
    }

    public void setClientIp(final String clientIp) {
        this.clientIp = clientIp;
    }

    public ThirdPartySystemTypes getSystemType() {
        return systemType;
    }

    public void setSystemType(final ThirdPartySystemTypes systemType) {
        this.systemType = systemType;
    }

    @Override
    public String toString() {
        return "CtrsRedirectPlainReqDto{" +
                "userName='" + userName + '\'' +
                ", officeNumber='" + officeNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", clientIp='" + clientIp + '\'' +
                ", systemType=" + systemType +
                '}';
    }
}
