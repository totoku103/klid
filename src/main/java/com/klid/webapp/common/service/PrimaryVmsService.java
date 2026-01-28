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
public class PrimaryVmsService implements PrimaryVmsServiceI {

    private final ThirdPartyRestTemplate thirdPartyRestTemplate;
    private final ThirdPartyCryptoService thirdPartyCryptoService;

    public PrimaryVmsService(final ThirdPartyRestTemplate thirdPartyRestTemplate, final ThirdPartyCryptoService thirdPartyCryptoService) {
        this.thirdPartyRestTemplate = thirdPartyRestTemplate;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
    }

    @Override
    public ThirdPartyAuthPrimaryPlainResDto requestCheck(String id, String password, String clientIp) {
        log.info(String.format("VMS request id: %s, client ip: %s", id, clientIp));
        final ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto = thirdPartyCryptoService.encryptThirdPartyAuthPrimaryReqDto(id, password, ThirdPartySystemTypes.VMS, clientIp);
        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> vmsAuthResult = thirdPartyRestTemplate.postAuthVms(thirdPartyAuthPrimaryCryptoReqDto);
        log.info(String.format("VMS auth crypto result: %s", vmsAuthResult));
        if (vmsAuthResult.getStatus() == ThirdPartyResponseStatusCodes.SUCCESS.getCode()) {
            log.info("VMS request Success");
            final ThirdPartyAuthPrimaryCryptoResDto data = vmsAuthResult.getData();
            final ThirdPartyAuthPrimaryPlainResDto thirdPartyAuthPrimaryPlainResDto = thirdPartyCryptoService.decryptThirdPartyAuthPrimaryResDto(data);
            log.debug(String.format("VMS auth plain result: %s", thirdPartyAuthPrimaryPlainResDto));
            return thirdPartyAuthPrimaryPlainResDto;
        } else {
            final ThirdPartyResponseStatusCodes thirdPartyResponseStatusCodes = ThirdPartyResponseStatusCodes.fromCode(vmsAuthResult.getStatus());
            log.info(String.format("VMS request Failed: [%s] [%d] %s ", id, thirdPartyResponseStatusCodes.getCode(), thirdPartyResponseStatusCodes.getSystemMessage()));
            throw new CustomException(thirdPartyResponseStatusCodes.getUserMessage());
        }
    }
}
