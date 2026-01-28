package com.klid.webapp.common.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ThirdPartyRestTemplate;
import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryCryptoReqDto;
import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryCryptoResDto;
import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryPlainResDto;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("!local")
@Service
@Slf4j
public class PrimaryCtssService implements PrimaryCtssServiceI {

    private final ThirdPartyRestTemplate thirdPartyRestTemplate;
    private final ThirdPartyCryptoService thirdPartyCryptoService;

    public PrimaryCtssService(final ThirdPartyRestTemplate thirdPartyRestTemplate, final ThirdPartyCryptoService thirdPartyCryptoService) {
        this.thirdPartyRestTemplate = thirdPartyRestTemplate;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
    }

    @Override
    public ThirdPartyAuthPrimaryPlainResDto requestCheck(String id, String password, String clientIp) {
        log.info(String.format("CTSS request id: %s, client ip: %s", id, clientIp));
        final ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto = thirdPartyCryptoService.encryptThirdPartyAuthPrimaryReqDto(id, password, ThirdPartySystemTypes.CTSS, clientIp);
        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> ctssAuthResult = thirdPartyRestTemplate.postAuthCtss(thirdPartyAuthPrimaryCryptoReqDto);
        log.info(String.format("CTSS auth crypto result: %s", ctssAuthResult));
        if (ctssAuthResult.getStatus() == ThirdPartyResponseStatusCodes.SUCCESS.getCode()) {
            log.info("CTSS request Success");
            final ThirdPartyAuthPrimaryCryptoResDto data = ctssAuthResult.getData();
            final ThirdPartyAuthPrimaryPlainResDto thirdPartyAuthPrimaryPlainResDto = thirdPartyCryptoService.decryptThirdPartyAuthPrimaryResDto(data);
            log.debug(String.format("CTSS auth plain result: %s", thirdPartyAuthPrimaryPlainResDto));
            return thirdPartyAuthPrimaryPlainResDto;
        } else {
            final ThirdPartyResponseStatusCodes thirdPartyResponseStatusCodes = ThirdPartyResponseStatusCodes.fromCode(ctssAuthResult.getStatus());
            log.info(String.format("CTSS request Failed: [%s] [%d] %s ", id, thirdPartyResponseStatusCodes.getCode(), thirdPartyResponseStatusCodes.getSystemMessage()));
            throw new CustomException(thirdPartyResponseStatusCodes.getUserMessage());
        }
    }
}
