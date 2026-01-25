package com.klid.webapp.common.service;

import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryPlainResDto;

public interface PrimaryCtssServiceI {
    ThirdPartyAuthPrimaryPlainResDto requestCheck(String id, String password, String clientIp);
}
