package com.klid.webapp.common.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ThirdPartyRestTemplate;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.dto.ThirdPartyRedirectCryptoReqDto;
import com.klid.webapp.common.dto.ThirdPartyRedirectResDto;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RedirectVmsService {


    private final ThirdPartyRestTemplate thirdPartyRestTemplate;
    private final ThirdPartyCryptoService thirdPartyCryptoService;

    public RedirectVmsService(final ThirdPartyRestTemplate thirdPartyRestTemplate,
                              final ThirdPartyCryptoService thirdPartyCryptoService) {
        this.thirdPartyRestTemplate = thirdPartyRestTemplate;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
    }

    public String requestRedirectMainPage(String userName, String officeNumber, String plainPhoneNumber, String clientIp) {
        log.info("VMS redirect 요청.");
        final ThirdPartyRedirectCryptoReqDto cryptoReqDto = thirdPartyCryptoService.encryptThirdPartyRedirectCryptoReqDto(userName, officeNumber, plainPhoneNumber, clientIp, ThirdPartySystemTypes.VMS);
        log.info("VMS redirect request dto." + cryptoReqDto);
        final ThirdPartyBaseResDto<ThirdPartyRedirectResDto> resDto = thirdPartyRestTemplate.postRedirect(cryptoReqDto);
        log.info("VMS response. " + resDto);
        if (ThirdPartyResponseStatusCodes.SUCCESS.getCode() == resDto.getStatus()) {
            log.info("VMS Redirect response SUCCESS.");
            final ThirdPartyRedirectResDto data = resDto.getData();
            return data.getRedirectUrl();
        } else {
            final ThirdPartyResponseStatusCodes thirdPartyResponseStatusCodes = ThirdPartyResponseStatusCodes.fromCode(resDto.getStatus());
            throw new CustomException(thirdPartyResponseStatusCodes.getUserMessage());
        }
    }
}
