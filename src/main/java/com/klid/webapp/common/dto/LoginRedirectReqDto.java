package com.klid.webapp.common.dto;

import com.klid.webapp.common.enums.ThirdPartySystemTypes;

public class LoginRedirectReqDto implements IntegrationLoginReqDto {
    private String id;
    private String clientIp;
    private ThirdPartySystemTypes systemType;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id != null ? id.trim() : null;
    }

    public ThirdPartySystemTypes getSystemType() {
        return systemType;
    }

    public void setSystemType(final ThirdPartySystemTypes systemType) {
        this.systemType = systemType;
    }

    @Override
    public String getClientIp() {
        return clientIp;
    }

    public void setClientIp(final String clientIp) {
        this.clientIp = clientIp;
    }
}
