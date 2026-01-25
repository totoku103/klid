package com.klid.webapp.common.dto;

import com.klid.webapp.common.enums.ThirdPartySystemTypes;

public interface IntegrationLoginReqDto {
    String getId();
    String getClientIp();
    ThirdPartySystemTypes getSystemType();
}
