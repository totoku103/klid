package com.klid.webapp.main.thirdparty.redirect.dto;

import com.klid.webapp.common.enums.RedirectTokenStatusTypes;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;

import java.sql.Timestamp;

public class SimpleSaveTokenInfoDto {
    private String userId;
    private String clientIp;
    private ThirdPartySystemTypes systemType;
    private String token;
    private Timestamp expiredAt;
    private RedirectTokenStatusTypes status;
    private String isUsed;

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
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

    public String getToken() {
        return token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    public Timestamp getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(final Timestamp expiredAt) {
        this.expiredAt = expiredAt;
    }

    public RedirectTokenStatusTypes getStatus() {
        return status;
    }

    public void setStatus(final RedirectTokenStatusTypes status) {
        this.status = status;
    }

    public String getIsUsed() {
        return isUsed;
    }

    public void setIsUsed(final String isUsed) {
        this.isUsed = isUsed;
    }

    @Override
    public String toString() {
        return "SimpleSaveTokenInfoDto{" +
                "userId='" + userId + '\'' +
                ", systemType=" + systemType +
                ", token='" + token + '\'' +
                ", expiredAt=" + expiredAt +
                ", status=" + status +
                ", isUsed='" + isUsed + '\'' +
                '}';
    }
}
