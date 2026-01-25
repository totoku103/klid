package com.klid.webapp.common.dto;

import com.klid.webapp.common.enums.ThirdPartySystemTypes;

public class ThirdPartyOtpInitializePlainResDto {
    private String userName;
    private String officeNumber;
    private String phoneNumber;
    private ThirdPartySystemTypes systemType;

    private String reqUserId;
    private String reqUserName;

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

    @Override
    public String toString() {
        return "ThirdPartyOtpInitializePlainResDto{" +
                "userName='" + userName + '\'' +
                ", officeNumber='" + officeNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", systemType=" + systemType +
                ", reqUserId='" + reqUserId + '\'' +
                ", reqUserName='" + reqUserName + '\'' +
                '}';
    }
}
