package com.klid.webapp.common.service;

import com.klid.common.IntegrationSessionManager;
import com.klid.common.OtpApi;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ThirdPartyRestTemplate;
import com.klid.webapp.common.dto.*;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import com.klid.webapp.common.enums.ThirdPartyUserTypes;
import com.klid.webapp.main.user.otp.persistence.OtpMapper;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Profile("!local & !dev")
public class OtpServiceImpl implements OtpService {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final OtpMapper otpMapper;
    private final SecondCtrsService secondCtrsService;
    private final SecondVmsService secondVmsService;
    private final SecondCtssService secondCtssService;
    private final ThirdPartyRestTemplate thirdPartyRestTemplate;
    private final ThirdPartyCryptoService thirdPartyCryptoService;
    private final ThirdPartyRedirectService thirdPartyRedirectService;

    public OtpServiceImpl(final OtpMapper otpMapper,
                      final SecondCtrsService secondCtrsService,
                      final SecondVmsService secondVmsService,
                      final SecondCtssService secondCtssService,
                      final ThirdPartyRestTemplate thirdPartyRestTemplate,
                      final ThirdPartyCryptoService thirdPartyCryptoService,
                      final ThirdPartyRedirectService thirdPartyRedirectService) {
        this.otpMapper = otpMapper;
        this.secondCtrsService = secondCtrsService;
        this.secondVmsService = secondVmsService;
        this.secondCtssService = secondCtssService;
        this.thirdPartyRestTemplate = thirdPartyRestTemplate;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
        this.thirdPartyRedirectService = thirdPartyRedirectService;
    }

    public String generateSecretKey() {
        log.info("OTP 시크릿 키 생성");
        return OtpApi.generate(StringUtils.EMPTY, StringUtils.EMPTY);
    }

    public String generateSecretKeyAndSetSession() {
        final String secretKey = generateSecretKey();
        IntegrationSessionManager.setOtpSecretKeys(secretKey);
        return secretKey;
    }

    public void validateSession() {
        if (!IntegrationSessionManager.isAuthenticatePrimary()) {
            log.warn("OTP 인증 시도 실패 - 1차 인증 정보 없음");
            throw new CustomException("1차 인증 정보가 없습니다.");
        }
    }

    public String getOtpSecretKeyFromSession() {
        final String otpSecretKey = IntegrationSessionManager.getOtpSecretKey();
        if (StringUtils.isBlank(otpSecretKey)) {
            log.warn("OTP 인증 시도 실패 - OTP 시크릿 키 정보 없음");
            throw new CustomException("OTP 주요 정보가 없습니다.");
        }
        return otpSecretKey;
    }

    public String[] getOtpSecretKeyArrayFromSession() {
        final String[] otpSecretKey = IntegrationSessionManager.getOtpSecretKeyArray();
        if (otpSecretKey.length == 0) {
            log.warn("OTP 인증 시도 실패 - OTP 시크릿 키 정보 없음");
            throw new CustomException("OTP 주요 정보가 없습니다.");
        }
        return otpSecretKey;
    }

    public boolean checkOtpCode(String userCode, String otpSecretKey) {
        return OtpApi.checkCode(userCode, otpSecretKey);
    }

    public String getCtrsOtpSecretKey(final String userName,
                                      final String officeNumber,
                                      final String plainPhoneNumber) {
        final UserDto userInfo = thirdPartyRedirectService.getUserInfo(userName, officeNumber, plainPhoneNumber);
        if (userInfo == null) return null;
        log.info(String.format("OTP 시크릿 키 조회 - userName: %s, officeNumber: %s, phoneNumber: %s, 시크릿 키 보유: %b", userName, officeNumber, plainPhoneNumber, StringUtils.isBlank(userInfo.getOtpKey())));
        return userInfo.getOtpKey();
    }

    public String getVmsOtpSecretKey(final String userName,
                                     final String officeNumber,
                                     final String phoneNumber) {
        final ThirdPartyAuthOtpCheckPlainResDto otpSecretKey = getOtpSecretKey(userName, officeNumber, phoneNumber, ThirdPartyUserTypes.VMS);
        return otpSecretKey == null
                ? null
                : StringUtils.isBlank(otpSecretKey.getOtpSecretKey())
                ? null
                : otpSecretKey.getOtpSecretKey();
    }

    public String getCtssOtpSecretKey(final String userName,
                                      final String officeNumber,
                                      final String phoneNumber) {
        final ThirdPartyAuthOtpCheckPlainResDto otpSecretKey = getOtpSecretKey(userName, officeNumber, phoneNumber, ThirdPartyUserTypes.CTSS);
        return otpSecretKey == null
                ? null
                : StringUtils.isBlank(otpSecretKey.getOtpSecretKey())
                ? null
                : otpSecretKey.getOtpSecretKey();
    }

    public ThirdPartyAuthOtpCheckPlainResDto getOtpSecretKey(final String userName,
                                                             final String officeNumber,
                                                             final String phoneNumber,
                                                             final ThirdPartyUserTypes userType) {
        final ThirdPartyAuthOtpCheckCryptReqDto thirdPartyAuthOtpCheckCryptReqDto = thirdPartyCryptoService.encryptThirdPartyAuthOtpCheckCryptReqDto(userName, officeNumber, phoneNumber, userType);
        final ThirdPartyBaseResDto<ThirdPartyAuthOtpCheckCryptoResDto> response = thirdPartyRestTemplate.postOtpCheck(thirdPartyAuthOtpCheckCryptReqDto);
        if (ThirdPartyResponseStatusCodes.SUCCESS.getCode() == response.getStatus()) {
            final ThirdPartyAuthOtpCheckCryptoResDto data = response.getData();

            final ThirdPartyAuthOtpCheckPlainResDto plainDto = thirdPartyCryptoService.decryptThirdPartyAuthOtpCheckCryptoResDto(data);
            return plainDto;
        } else {
            if (ThirdPartyResponseStatusCodes.DUPLICATED_USER.getCode() == response.getStatus()) {
                log.error("CTSS OTP CHECK." + ThirdPartyResponseStatusCodes.DUPLICATED_USER.getUserMessage() + ", " + userName + ", " + officeNumber + ", " + phoneNumber + ", " + userType);
                throw new CustomException(ThirdPartyResponseStatusCodes.DUPLICATED_USER.getUserMessage());
            }
            log.info("CTSS OTP 조회 실패." + response.getMessage());
            return null;
        }
    }

    @Transactional
    public void updateOtpSecretKeyAllSystem(final String otpSecretKey,
                                            final String userName,
                                            final String officeNumber,
                                            final String plainPhoneNumber) {
        // 저장 전 검증 API가 없어, 전 시스템에 브로드케스트처럼 전부 요청하고 응답값은 무시한다.
        try {
            secondVmsService.postOtpSecretKeyWithBody(otpSecretKey, userName, officeNumber, plainPhoneNumber);
            secondCtssService.postOtpSecretKeyWithBody(otpSecretKey, userName, officeNumber, plainPhoneNumber);
        } catch (Exception e) {
            final String message = e.getMessage();
            log.warn(String.format("error message: %s, %s, %s, %s, otpSecretKey: %s", message, userName, officeNumber, plainPhoneNumber, otpSecretKey));
        }
        secondCtrsService.updateOtpSecretKey(userName, officeNumber, plainPhoneNumber, otpSecretKey);
    }

    public boolean hasUsableSecretKey(String ctrs, String vms, String ctss) {
        return StringUtils.isNotBlank(ctrs) || StringUtils.isNotBlank(vms) || StringUtils.isNotBlank(ctss);
    }

    public String getSecretKeyAndCheckOtpCode(String[] otpSecretKeys, String otpUserCode) {
        log.debug("otp secret key arrays: " + String.join(", ", otpSecretKeys));
        boolean isPass = false;
        String finalOtpSecretKey = null;
        for (String otpSecretKey : otpSecretKeys) {
            if (StringUtils.isBlank(otpSecretKey)) continue;
            isPass = checkOtpCode(otpUserCode, otpSecretKey);
            if (isPass) {
                finalOtpSecretKey = otpSecretKey;
                break;
            }
        }
        return finalOtpSecretKey;
    }
}
