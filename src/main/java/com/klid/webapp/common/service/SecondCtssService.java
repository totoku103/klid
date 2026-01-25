package com.klid.webapp.common.service;

import com.klid.webapp.common.ThirdPartyRestTemplate;
import com.klid.webapp.common.dto.ThirdPartyAuthSecondValueCryptReqDto;
import com.klid.webapp.common.dto.ThirdPartyAuthSecondValueResDto;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.enums.ThirdPartyUserTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SecondCtssService {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final ThirdPartyRestTemplate thirdPartyRestTemplate;
    private final ThirdPartyCryptoService thirdPartyCryptoService;

    public SecondCtssService(final ThirdPartyRestTemplate thirdPartyRestTemplate, final ThirdPartyCryptoService thirdPartyCryptoService) {
        this.thirdPartyRestTemplate = thirdPartyRestTemplate;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> postOtpSecretKeyWithBody(final String otpSecretKey,
                                                                                          final String userName,
                                                                                          final String officeNumber,
                                                                                          final String plainPhoneNumber) {
        final ThirdPartyAuthSecondValueCryptReqDto cryptoReqDto = this.thirdPartyCryptoService.encryptThirdPartyAuthSecondValueCryptReqDto(
                ThirdPartyAuthSecondValueCryptReqDto.ApiType.OTP,
                userName,
                officeNumber,
                plainPhoneNumber,
                ThirdPartyUserTypes.CTSS,
                otpSecretKey);

        return thirdPartyRestTemplate.postSecondValue(cryptoReqDto);
    }

}
