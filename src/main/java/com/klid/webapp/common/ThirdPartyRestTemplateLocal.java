package com.klid.webapp.common;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.dto.*;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Local 프로파일에서 사용되는 Mock ThirdPartyRestTemplate
 * 모든 외부 API 호출을 성공 응답으로 시뮬레이션
 */
@Component
@Profile("local")
@Slf4j
public class ThirdPartyRestTemplateLocal extends ThirdPartyRestTemplate {

    public ThirdPartyRestTemplateLocal() {
        super(null, null);
    }

    @Override
    public void checkVms() {
        log.info("[LOCAL MODE] VMS 서버 상태 확인 - Mock 성공 응답");
    }

    @Override
    public void checkCtss() {
        log.info("[LOCAL MODE] CTSS 서버 상태 확인 - Mock 성공 응답");
    }

    private ThirdPartyAuthPrimaryCryptoResDto getThirdPartyAuthPrimaryCryptoResDto() {
        final ThirdPartyAuthPrimaryCryptoResDto dto = new ThirdPartyAuthPrimaryCryptoResDto();
        dto.setOtpKey("WNB9A/e1e9NZ/HVKAG3Cy1FNNK7pocuLWFu+2yqzYEs=");
        dto.setGpkiKey("psgdN11TSm/KwtZHgtRKbg==");
        dto.setEmail("dNFhxUw2lTWvFsQ1OVL+Vg==");
        dto.setIv("xLAeL6mTBayOK7JBJFHcrA==");
        dto.setHmac("6NUTEcAEEjEFQ/cLUqlA1X8rSDSxFnxq4qtHI82wRko=");
        return dto;
    }

    private ThirdPartyAuthOtpCheckCryptoResDto getThirdPartyAuthOtpCheckCryptoResDto() {
        final ThirdPartyAuthOtpCheckCryptoResDto thirdPartyAuthOtpCheckCryptoResDto = new ThirdPartyAuthOtpCheckCryptoResDto();
        thirdPartyAuthOtpCheckCryptoResDto.setUserId("KUdrwWltKBfzQPv0UIzTog==");
        thirdPartyAuthOtpCheckCryptoResDto.setOtpSecretKey("lAnv2/cEYX++OUzAWw4JhraB90azr3YJBeUygAAVVxw=");
        thirdPartyAuthOtpCheckCryptoResDto.setIv("1FOG/TnW0cPIFJq9AFXhFg==");
        thirdPartyAuthOtpCheckCryptoResDto.setHmac("4zNjpY2C/aQBnpulLf5L68reZVqQiBBOrIpcQc8pmwI=");
        return thirdPartyAuthOtpCheckCryptoResDto;
    }

    @Override
    public ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> postAuthVms(ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto) {
        log.info("[LOCAL MODE] VMS 인증 요청 - Mock 성공 응답");
        ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> response = new ThirdPartyBaseResDto<>();
        response.setStatus(ThirdPartyResponseStatusCodes.SUCCESS.getCode());
        response.setMessage(ThirdPartyResponseStatusCodes.SUCCESS.getSystemMessage());
        response.setData(getThirdPartyAuthPrimaryCryptoResDto());
        return response;
    }

    @Override
    public ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> postAuthCtss(ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto) {
        log.info("[LOCAL MODE] CTSS 인증 요청 - Mock 성공 응답");
        ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> response = new ThirdPartyBaseResDto<>();
        response.setStatus(ThirdPartyResponseStatusCodes.SUCCESS.getCode());
        response.setMessage(ThirdPartyResponseStatusCodes.SUCCESS.getSystemMessage());
        response.setData(getThirdPartyAuthPrimaryCryptoResDto());
        return response;
    }

    @Override
    public ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> postSecondValue(ThirdPartyAuthSecondValueCryptReqDto cryptoDto) {
        final ThirdPartyAuthSecondValueResDto thirdPartyAuthSecondValueResDto = new ThirdPartyAuthSecondValueResDto();
        thirdPartyAuthSecondValueResDto.setUserId("mock-test");
        thirdPartyAuthSecondValueResDto.setSaved("True");
        log.info("[LOCAL MODE] 2차 인증값 조회 - Mock 성공 응답");
        ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> response = new ThirdPartyBaseResDto<>();
        response.setStatus(ThirdPartyResponseStatusCodes.SUCCESS.getCode());
        response.setMessage(ThirdPartyResponseStatusCodes.SUCCESS.getSystemMessage());
        response.setData(thirdPartyAuthSecondValueResDto);
        return response;
    }

    @Override
    public ThirdPartyBaseResDto<ThirdPartyRedirectResDto> postRedirect(ThirdPartyRedirectCryptoReqDto cryptoDto) {
        final ThirdPartyRedirectResDto thirdPartyRedirectResDto = new ThirdPartyRedirectResDto();
        thirdPartyRedirectResDto.setRedirectUrl("https://www.google.com");
        log.info("[LOCAL MODE] Redirect 요청 - Mock 성공 응답");
        ThirdPartyBaseResDto<ThirdPartyRedirectResDto> response = new ThirdPartyBaseResDto<>();
        response.setStatus(ThirdPartyResponseStatusCodes.SUCCESS.getCode());
        response.setMessage(ThirdPartyResponseStatusCodes.SUCCESS.getSystemMessage());
        response.setData(thirdPartyRedirectResDto);
        return response;
    }

    @Override
    public ThirdPartyBaseResDto<ThirdPartyAuthOtpCheckCryptoResDto> postOtpCheck(ThirdPartyAuthOtpCheckCryptReqDto cryptoDto) {
        log.info("[LOCAL MODE] OTP 확인 - Mock 성공 응답");
        ThirdPartyBaseResDto<ThirdPartyAuthOtpCheckCryptoResDto> response = new ThirdPartyBaseResDto<>();
        response.setStatus(ThirdPartyResponseStatusCodes.SUCCESS.getCode());
        response.setMessage(ThirdPartyResponseStatusCodes.SUCCESS.getSystemMessage());
        response.setData(getThirdPartyAuthOtpCheckCryptoResDto());
        return response;
    }

    @Override
    public ThirdPartyBaseResDto<ThirdPartyAuthEmailSendCryptResDto> postEmailSend(ThirdPartyAuthEmailSendCryptReqDto cryptoDto) {
        final ThirdPartyAuthEmailSendCryptResDto thirdPartyAuthEmailSendCryptResDto = new ThirdPartyAuthEmailSendCryptResDto();
        thirdPartyAuthEmailSendCryptResDto.setEmailSent("true");

        log.info("[LOCAL MODE] 이메일 전송 - Mock 성공 응답");
        ThirdPartyBaseResDto<ThirdPartyAuthEmailSendCryptResDto> response = new ThirdPartyBaseResDto<>();
        response.setStatus(ThirdPartyResponseStatusCodes.SUCCESS.getCode());
        response.setMessage(ThirdPartyResponseStatusCodes.SUCCESS.getSystemMessage());
        response.setData(thirdPartyAuthEmailSendCryptResDto);
        return response;
    }
}
