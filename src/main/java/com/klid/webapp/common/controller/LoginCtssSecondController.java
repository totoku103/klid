package com.klid.webapp.common.controller;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import com.klid.webapp.common.dto.OtpCheckReqDto;
import com.klid.webapp.common.security.SecurityAuthenticationService;
import com.klid.webapp.common.service.OtpService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login/ctss/authenticate/second")
@Slf4j
public class LoginCtssSecondController {

    private final OtpService otpService;
    private final SecurityAuthenticationService securityAuthenticationService;

    public LoginCtssSecondController(final OtpService otpService,
                                     final SecurityAuthenticationService securityAuthenticationService) {
        this.otpService = otpService;
        this.securityAuthenticationService = securityAuthenticationService;
    }

    @PostMapping("/otp")
    public ReturnData authenticateOtp(@RequestBody OtpCheckReqDto otpCheckReq) {
        otpService.validateSession();

        final String[] otpSecretKeyArrayFromSession = otpService.getOtpSecretKeyArrayFromSession();
        final String finalOtpSecretKey = otpService.getSecretKeyAndCheckOtpCode(otpSecretKeyArrayFromSession, otpCheckReq.getUserCode());
        final boolean isPass = StringUtils.isNotBlank(finalOtpSecretKey);

        if (isPass) {
            IntegrationSessionManager.setSecondAuthSuccess();
            securityAuthenticationService.setSecurityAuthentication();
            final IntegrationLoginInfoDto integrationLoginInfo = IntegrationSessionManager.getIntegrationLoginInfo();
            otpService.updateOtpSecretKeyAllSystem(finalOtpSecretKey, integrationLoginInfo.getUserName(), integrationLoginInfo.getOfficeNumber(), integrationLoginInfo.getPlainPhoneNumber());
        } else {
            log.warn("CTSS 2차 OTP 인증 실패");
        }

        final Map<String, Boolean> result = new HashMap<>();
        result.put("isPass", isPass);

        log.info("CTSS 2차 OTP 인증 완료 - 결과: " + (isPass ? "성공" : "실패"));
        return new ReturnData(result);
    }

}
