package com.klid.webapp.common.service;

import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.dto.ThirdPartyAuthOtpCheckPlainResDto;
import com.klid.webapp.common.enums.ThirdPartyUserTypes;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

/**
 * OTP 서비스 Mock 구현체
 * local, dev 프로파일에서 사용
 * OTP 코드 "860207" 입력 시 검증 통과
 */
@Service
@Profile({"local", "dev"})
public class OtpServiceMock implements OtpService {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private static final String MOCK_OTP_CODE = "860207";
    private static final String MOCK_SECRET_KEY = "MOCK_SECRET_KEY_FOR_LOCAL_DEV";

    @Override
    public String generateSecretKey() {
        log.info("[MOCK] OTP 시크릿 키 생성");
        return MOCK_SECRET_KEY;
    }

    @Override
    public String generateSecretKeyAndSetSession() {
        final String secretKey = generateSecretKey();
        IntegrationSessionManager.setOtpSecretKeys(secretKey);
        return secretKey;
    }

    @Override
    public void validateSession() {
        if (!IntegrationSessionManager.isAuthenticatePrimary()) {
            log.warn("[MOCK] OTP 인증 시도 실패 - 1차 인증 정보 없음");
            throw new CustomException("1차 인증 정보가 없습니다.");
        }
    }

    @Override
    public String getOtpSecretKeyFromSession() {
        final String otpSecretKey = IntegrationSessionManager.getOtpSecretKey();
        if (StringUtils.isBlank(otpSecretKey)) {
            log.warn("[MOCK] OTP 인증 시도 실패 - OTP 시크릿 키 정보 없음, 목업 키 반환");
            return MOCK_SECRET_KEY;
        }
        return otpSecretKey;
    }

    @Override
    public String[] getOtpSecretKeyArrayFromSession() {
        final String[] otpSecretKey = IntegrationSessionManager.getOtpSecretKeyArray();
        if (otpSecretKey.length == 0) {
            log.warn("[MOCK] OTP 인증 시도 실패 - OTP 시크릿 키 정보 없음, 목업 키 배열 반환");
            return new String[]{MOCK_SECRET_KEY};
        }
        return otpSecretKey;
    }

    @Override
    public boolean checkOtpCode(String userCode, String otpSecretKey) {
        log.info("[MOCK] OTP 코드 검증 - 입력 코드: {}", userCode);
        if (MOCK_OTP_CODE.equals(userCode)) {
            log.info("[MOCK] OTP 검증 통과 (목업 코드 일치)");
            return true;
        }
        log.warn("[MOCK] OTP 검증 실패 - 목업 코드({})와 불일치", MOCK_OTP_CODE);
        return false;
    }

    @Override
    public String getCtrsOtpSecretKey(String userName, String officeNumber, String plainPhoneNumber) {
        log.info("[MOCK] CTRS OTP 시크릿 키 조회 - userName: {}, officeNumber: {}", userName, officeNumber);
        return MOCK_SECRET_KEY;
    }

    @Override
    public String getVmsOtpSecretKey(String userName, String officeNumber, String phoneNumber) {
        log.info("[MOCK] VMS OTP 시크릿 키 조회 - userName: {}, officeNumber: {}", userName, officeNumber);
        return MOCK_SECRET_KEY;
    }

    @Override
    public String getCtssOtpSecretKey(String userName, String officeNumber, String phoneNumber) {
        log.info("[MOCK] CTSS OTP 시크릿 키 조회 - userName: {}, officeNumber: {}", userName, officeNumber);
        return MOCK_SECRET_KEY;
    }

    @Override
    public ThirdPartyAuthOtpCheckPlainResDto getOtpSecretKey(String userName, String officeNumber, String phoneNumber, ThirdPartyUserTypes userType) {
        log.info("[MOCK] OTP 시크릿 키 조회 - userName: {}, officeNumber: {}, userType: {}", userName, officeNumber, userType);
        ThirdPartyAuthOtpCheckPlainResDto dto = new ThirdPartyAuthOtpCheckPlainResDto();
        dto.setOtpSecretKey(MOCK_SECRET_KEY);
        return dto;
    }

    @Override
    public void updateOtpSecretKeyAllSystem(String otpSecretKey, String userName, String officeNumber, String plainPhoneNumber) {
        log.info("[MOCK] 전체 시스템 OTP 시크릿 키 업데이트 - userName: {}, officeNumber: {}", userName, officeNumber);
        // Mock에서는 실제 업데이트 수행하지 않음
    }

    @Override
    public boolean hasUsableSecretKey(String ctrs, String vms, String ctss) {
        // Mock에서는 항상 true 반환
        return true;
    }

    @Override
    public String getSecretKeyAndCheckOtpCode(String[] otpSecretKeys, String otpUserCode) {
        log.info("[MOCK] OTP 코드 검증 및 시크릿 키 반환 - 입력 코드: {}", otpUserCode);
        if (MOCK_OTP_CODE.equals(otpUserCode)) {
            log.info("[MOCK] OTP 검증 통과 (목업 코드 일치)");
            return MOCK_SECRET_KEY;
        }
        log.warn("[MOCK] OTP 검증 실패 - 목업 코드({})와 불일치", MOCK_OTP_CODE);
        return null;
    }
}
