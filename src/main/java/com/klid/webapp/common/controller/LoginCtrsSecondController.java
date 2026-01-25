package com.klid.webapp.common.controller;

import com.klid.common.IntegrationSessionManager;
import com.klid.common.SEED_KISA256;
import com.klid.common.util.RandomUtils;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.*;
import com.klid.webapp.common.security.SecurityAuthenticationService;
import com.klid.webapp.common.service.EmailService;
import com.klid.webapp.common.service.OtpService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login/ctrs/authenticate/second")
public class LoginCtrsSecondController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final OtpService otpService;
    private final EmailService emailService;
    private final SecurityAuthenticationService securityAuthenticationService;

    public LoginCtrsSecondController(final OtpService otpService,
                                     final EmailService emailService,
                                     final SecurityAuthenticationService securityAuthenticationService) {
        this.otpService = otpService;
        this.emailService = emailService;
        this.securityAuthenticationService = securityAuthenticationService;
    }

    @PostMapping("/otp")
    public ReturnData authenticateOtp(@RequestBody OtpCheckReqDto otpCheckReq) {
        final IntegrationLoginInfoDto integrationLoginInfo = IntegrationSessionManager.getIntegrationLoginInfo();
        log.info("CTRS 2차 OTP 인증 요청 시작 - " + (integrationLoginInfo != null ? integrationLoginInfo.getPk() : "null"));
        otpService.validateSession();
        final String[] otpSecretKeyArrayFromSession = otpService.getOtpSecretKeyArrayFromSession();
        final String finalOtpSecretKey = otpService.getSecretKeyAndCheckOtpCode(otpSecretKeyArrayFromSession, otpCheckReq.getUserCode());
        final boolean isPass = StringUtils.isNotBlank(finalOtpSecretKey);

        if (isPass) {
            IntegrationSessionManager.setSecondAuthSuccess();
            securityAuthenticationService.setSecurityAuthentication();
            otpService.updateOtpSecretKeyAllSystem(finalOtpSecretKey, integrationLoginInfo.getUserName(), integrationLoginInfo.getOfficeNumber(), integrationLoginInfo.getPlainPhoneNumber());
        } else {
            log.warn("CTRS 2차 OTP 인증 실패 - " + integrationLoginInfo.getPk());
        }

        final Map<String, Boolean> result = new HashMap<>();
        result.put("isPass", isPass);
        return new ReturnData(result);
    }

    @PostMapping("/email/send")
    public ReturnData authenticateEmail() {
        final UserDto user = SessionManager.getUser();
        if (user == null) throw new CustomException("사용자 정보를 찾을 수 없습니다.");

        final String cryptoEmailAddr = user.getEmailAddr();
        if (StringUtils.isBlank(cryptoEmailAddr)) throw new CustomException("이메일 정보가 없습니다.");
        final String plainEmail = SEED_KISA256.Decrypt(cryptoEmailAddr);

        log.info("CTRS 2차 인증 EMAIL 인증 요청 시작 - 사용자ID: " + user.getUserId());

        log.debug("CTRS 1차 인증 상태 검증");
        validateAuthPrimary();

        log.debug("CTRS 이메일 발송 시간 제한 검증");
        emailService.validateEmailSendTime();

        log.debug("CTRS 외부 시스템 이메일 발송 요청");
        final String random6Digit = RandomUtils.getRandom6Digit();
        final ThirdPartyBaseResDto<ThirdPartyAuthEmailSendCryptResDto> response = emailService.postSendEmail(plainEmail, random6Digit);
        IntegrationSessionManager.setEmailRandomDigit(random6Digit);

        emailService.setUserLastAction();

        final EmailSendInfoDto emailRandomDigit = IntegrationSessionManager.getEmailRandomDigit();
        final Map<String, Object> result = new HashMap<>();
        final long expiredTimestamp = emailRandomDigit.getExpiredTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        result.put("expiredTimestamp", expiredTimestamp);
        result.put("message", response.getMessage());

        log.info("CTRS 이메일 인증 발송 완료 - 만료시간: " + emailRandomDigit.getExpiredTime());
        return new ReturnData(result);
    }

    private void validateAuthPrimary() {
        final boolean isPassPrimary = IntegrationSessionManager.isAuthenticatePrimary();
        if (!isPassPrimary) throw new AuthenticationCredentialsNotFoundException("1차 인증이 완료되지 않았습니다.");
    }
}
