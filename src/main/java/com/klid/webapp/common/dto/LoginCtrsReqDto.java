package com.klid.webapp.common.dto;

import com.klid.common.HttpRequestUtils;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;

public class LoginCtrsReqDto implements IntegrationLoginReqDto {
    private String id;
    private String password;
    private final String clientIp = HttpRequestUtils.getClientIp();
    private final ThirdPartySystemTypes systemType = ThirdPartySystemTypes.CTRS;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id != null ? id.trim() : null;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public ThirdPartySystemTypes getSystemType() {
        return systemType;
    }

    public String getClientIp() {
        return clientIp;
    }
}
