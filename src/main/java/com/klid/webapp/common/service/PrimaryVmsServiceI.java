package com.klid.webapp.common.service;

import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryPlainResDto;

public interface PrimaryVmsServiceI {
    ThirdPartyAuthPrimaryPlainResDto requestCheck(String id, String password, String clientIp);
}
