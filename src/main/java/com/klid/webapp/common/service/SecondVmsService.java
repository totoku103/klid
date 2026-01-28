package com.klid.webapp.common.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ThirdPartyRestTemplate;
import com.klid.webapp.common.dto.ThirdPartyAuthSecondValueCryptReqDto;
import com.klid.webapp.common.dto.ThirdPartyAuthSecondValueResDto;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import com.klid.webapp.common.enums.ThirdPartyUserTypes;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SecondVmsService {
    private final ThirdPartyRestTemplate thirdPartyRestTemplate;
    private final ThirdPartyCryptoService thirdPartyCryptoService;

    public SecondVmsService(final ThirdPartyRestTemplate thirdPartyRestTemplate, final ThirdPartyCryptoService thirdPartyCryptoService) {
        this.thirdPartyRestTemplate = thirdPartyRestTemplate;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> postGpkiSerialNumberReturnBody(final String serialNumber,
                                                                                                final String userName,
                                                                                                final String officeNumber,
                                                                                                final String plainPhoneNumber) {
        final ThirdPartyAuthSecondValueCryptReqDto cryptoReqDto = this.thirdPartyCryptoService.encryptThirdPartyAuthSecondValueCryptReqDto(ThirdPartyAuthSecondValueCryptReqDto.ApiType.GPKI,
                userName,
                officeNumber,
                plainPhoneNumber,
                ThirdPartyUserTypes.VMS,
                serialNumber);

        return thirdPartyRestTemplate.postSecondValue(cryptoReqDto);
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
                ThirdPartyUserTypes.VMS,
                otpSecretKey);

        return thirdPartyRestTemplate.postSecondValue(cryptoReqDto);
    }

    public void postOtpSecretKey(final String otpSecretKey,
                                 final String userName,
                                 final String officeNumber,
                                 final String phoneNumber) {
        final ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> response = postOtpSecretKeyWithBody(otpSecretKey, userName, officeNumber, phoneNumber);
        if (ThirdPartyResponseStatusCodes.SUCCESS.getCode() != response.getStatus()) {
            final ThirdPartyResponseStatusCodes thirdPartyResponseStatusCodes = ThirdPartyResponseStatusCodes.fromCode(response.getStatus());
            throw new CustomException(thirdPartyResponseStatusCodes.getUserMessage());
        }
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> postSendEmail(final String authCode,
                                                                               final String userName,
                                                                               final String officeNumber,
                                                                               final String plainPhoneNumber) {
        log.debug("E-MAIL 랜덤 숫자 생성");
        final ThirdPartyAuthSecondValueCryptReqDto cryptoReqDto = this.thirdPartyCryptoService.encryptThirdPartyAuthSecondValueCryptReqDto(
                ThirdPartyAuthSecondValueCryptReqDto.ApiType.EMAIL,
                userName,
                officeNumber,
                plainPhoneNumber,
                ThirdPartyUserTypes.VMS,
                authCode);

        log.info("E-MAIL 발송 요청");
        final ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> response = thirdPartyRestTemplate.postSecondValue(cryptoReqDto);
        if (ThirdPartyResponseStatusCodes.SUCCESS.getCode() == response.getStatus()) {
            log.info("E-MAIL 발송 요청 성공");
            return response;
        } else {
            final ThirdPartyResponseStatusCodes thirdPartyResponseStatusCodes = ThirdPartyResponseStatusCodes.fromCode(response.getStatus());
            log.info(String.format("E-MAIL 발송 요청 실패: [%d] %s ", thirdPartyResponseStatusCodes.getCode(), thirdPartyResponseStatusCodes.getSystemMessage()));
            throw new CustomException(thirdPartyResponseStatusCodes.getUserMessage());
        }
    }
}
