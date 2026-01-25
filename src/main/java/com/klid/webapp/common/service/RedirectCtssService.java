package com.klid.webapp.common.service;

import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ThirdPartyRestTemplate;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.dto.ThirdPartyRedirectCryptoReqDto;
import com.klid.webapp.common.dto.ThirdPartyRedirectResDto;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class RedirectCtssService {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final ThirdPartyRestTemplate thirdPartyRestTemplate;
    private final ThirdPartyCryptoService thirdPartyCryptoService;

    public RedirectCtssService(final ThirdPartyRestTemplate thirdPartyRestTemplate,
                               final ThirdPartyCryptoService thirdPartyCryptoService) {
        this.thirdPartyRestTemplate = thirdPartyRestTemplate;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
    }

    public String requestRedirectMainPage(final String userName, final String officeNumber, final String plainPhoneNumber, final String clientIp) {
        log.info("CTSS redirect 요청.");
        final ThirdPartyRedirectCryptoReqDto cryptoReqDto = thirdPartyCryptoService.encryptThirdPartyRedirectCryptoReqDto(userName, officeNumber, plainPhoneNumber, clientIp, ThirdPartySystemTypes.CTSS);
        log.info("CTSS redirect request dto." + cryptoReqDto);
        final ThirdPartyBaseResDto<ThirdPartyRedirectResDto> resDto = thirdPartyRestTemplate.postRedirect(cryptoReqDto);
        log.info("CTSS response. " + resDto);
        if (ThirdPartyResponseStatusCodes.SUCCESS.getCode() == resDto.getStatus()) {
            log.info("CTSS Redirect response SUCCESS.");
            final ThirdPartyRedirectResDto data = resDto.getData();
            return data.getRedirectUrl();
        } else {
            final ThirdPartyResponseStatusCodes thirdPartyResponseStatusCodes = ThirdPartyResponseStatusCodes.fromCode(resDto.getStatus());
            throw new CustomException(thirdPartyResponseStatusCodes.getUserMessage());
        }
    }
}
