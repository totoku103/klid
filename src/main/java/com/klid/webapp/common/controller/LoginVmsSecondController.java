package com.klid.webapp.common.controller;

import com.klid.common.IntegrationSessionManager;
import com.klid.common.util.RandomUtils;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.dto.*;
import com.klid.webapp.common.security.SecurityAuthenticationService;
import com.klid.webapp.common.service.EmailService;
import com.klid.webapp.common.service.OtpService;
import com.klid.webapp.common.service.SecondVmsService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login/vms/authenticate/second")
public class LoginVmsSecondController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final SecondVmsService secondVmsService;
    private final OtpService otpService;
    private final EmailService emailService;
    private final SecurityAuthenticationService securityAuthenticationService;

    public LoginVmsSecondController(final SecondVmsService secondVmsService,
                                    final OtpService otpService,
                                    final EmailService emailService,
                                    final SecurityAuthenticationService securityAuthenticationService) {
        this.secondVmsService = secondVmsService;
        this.otpService = otpService;
        this.emailService = emailService;
        this.securityAuthenticationService = securityAuthenticationService;
    }

    @PostMapping("/otp")
    public ReturnData authenticateOtp(@RequestBody OtpCheckReqDto otpCheckReq) {

        otpService.validateSession();

        log.debug("VMS OTP 코드 검증 시작");
        final String[] otpSecretKeyArrayFromSession = otpService.getOtpSecretKeyArrayFromSession();
        final String finalOtpSecretKey = otpService.getSecretKeyAndCheckOtpCode(otpSecretKeyArrayFromSession, otpCheckReq.getUserCode());
        final boolean isPass = StringUtils.isNotBlank(finalOtpSecretKey);

        if (isPass) {
            log.info("VMS 2차 OTP 인증 성공");
            IntegrationSessionManager.setSecondAuthSuccess();
            securityAuthenticationService.setSecurityAuthentication();
            final IntegrationLoginInfoDto integrationLoginInfo = IntegrationSessionManager.getIntegrationLoginInfo();
            otpService.updateOtpSecretKeyAllSystem(finalOtpSecretKey, integrationLoginInfo.getUserName(), integrationLoginInfo.getOfficeNumber(), integrationLoginInfo.getPlainPhoneNumber());
        } else {
            log.warn("VMS 2차 OTP 인증 실패");
        }

        final Map<String, Boolean> result = new HashMap<>();
        result.put("isPass", isPass);

        log.info("VMS 2차 OTP 인증 완료 - 결과: " + (isPass ? "성공" : "실패"));
        return new ReturnData(result);
    }

    @PostMapping("/email/send")
    public ReturnData sendEmail() {
        log.info("VMS 이메일 인증 발송 요청 시작");

        log.debug("VMS 1차 인증 상태 검증");
        validateAuthPrimary();

        log.debug("VMS 이메일 발송 시간 제한 검증");
        emailService.validateEmailSendTime();

        final IntegrationLoginInfoDto integrationLoginInfo = IntegrationSessionManager.getIntegrationLoginInfo();

        log.debug("VMS 외부 시스템 이메일 발송 요청");
        final String random6Digit = RandomUtils.getRandom6Digit();
        final ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> response = secondVmsService.postSendEmail(random6Digit, integrationLoginInfo.getUserName(), integrationLoginInfo.getOfficeNumber(), integrationLoginInfo.getPlainPhoneNumber());
        IntegrationSessionManager.setEmailRandomDigit(random6Digit);

        emailService.setUserLastAction();

        final EmailSendInfoDto emailRandomDigit = IntegrationSessionManager.getEmailRandomDigit();
        final Map<String, Object> result = new HashMap<>();
        final long expiredTimestamp = emailRandomDigit.getExpiredTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        result.put("expiredTimestamp", expiredTimestamp);
        result.put("message", response.getMessage());

        log.info("VMS 이메일 인증 발송 완료 - 만료시간: " + emailRandomDigit.getExpiredTime());
        return new ReturnData(result);
    }

    @PostMapping("/email/validate")
    public ReturnData validateEmailCode(@RequestBody EmailCheckReqDto emailCheckReqDto) {
        log.info("이메일 인증 검증 요청 시작");

        log.debug("1차 인증 상태 검증");
        validateAuthPrimary();

        final EmailSendInfoDto emailRandomDigit = IntegrationSessionManager.getEmailRandomDigit();
        if (emailRandomDigit == null || StringUtils.isBlank(emailRandomDigit.getDigit())) {
            log.error("이메일 검증 실패 - 세션 내 이메일 검증 번호가 없음");
            throw new CustomException("400", "이메일 검증 번호가 없습니다.");
        }

        if (emailRandomDigit.getExpiredTime().isBefore(LocalDateTime.now())) {
            log.warn("이메일 검증 실패 - 검증 번호 만료: " + emailRandomDigit.getExpiredTime());
            throw new CustomException("이메일 검증에 실패했습니다.");
        }

        if (emailRandomDigit.getDigit().equals(emailCheckReqDto.getUserCode())) {
            final Map<String, Boolean> result = new HashMap<>();
            result.put("isPass", true);
            IntegrationSessionManager.removeEmailRandomDigit();
            IntegrationSessionManager.setSecondAuthSuccess();
            securityAuthenticationService.setSecurityAuthentication();
            log.info("이메일 인증 성공");
            return new ReturnData(result);
        } else {
            log.warn("이메일 검증 실패 - 검증 번호 불일치");
            throw new CustomException("이메일 검증에 실패했습니다.");
        }
    }

    private void validateAuthPrimary() {
        final boolean isPassPrimary = IntegrationSessionManager.isAuthenticatePrimary();
        if (!isPassPrimary) throw new AuthenticationCredentialsNotFoundException("1차 인증이 완료되지 않았습니다.");
    }


}
