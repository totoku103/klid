package com.klid.webapp.common.controller;

import com.klid.common.HttpRequestUtils;
import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.*;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.service.OtpService;
import com.klid.webapp.common.service.PrimaryCtssService;
import com.klid.webapp.common.service.PrimaryCtssServiceI;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login/ctss/authenticate/primary")
public class LoginCtssPrimaryController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final PrimaryCtssServiceI primaryCtssService;
    private final OtpService otpService;

    public LoginCtssPrimaryController(final PrimaryCtssServiceI primaryCtssService,
                                      final OtpService otpService) {
        this.primaryCtssService = primaryCtssService;
        this.otpService = otpService;
    }

    @PostMapping
    public ReturnData authenticatePrimary(@RequestBody LoginCtssReqDto reqDto) {
        log.info(String.format("[%s] 1차 인증 요청 시작. id: %s, ip: %s", reqDto.getSystemType(), reqDto.getId(), reqDto.getClientIp()));

        final String userId = reqDto.getId();
        final String clientIp = reqDto.getClientIp();
        if (StringUtils.isBlank(userId)) {
            log.warn("CTSS 인증 실패 - 사용자 ID 누락, IP: " + clientIp);
            throw new CustomException("사용자 ID를 입력해주세요.");
        }
        if (StringUtils.isBlank(reqDto.getPassword())) {
            log.warn("CTSS 인증 실패 - 비밀번호 누락, 사용자ID: " + userId + ", IP: " + clientIp);
            throw new CustomException("비밀번호를 입력해주세요.");
        }

        log.debug("CTSS 외부 시스템 인증 요청 - 사용자ID: " + userId + ", IP: " + clientIp);
        SessionManager.setLiteLoginInfo(userId, clientIp, ThirdPartySystemTypes.CTSS);
        final ThirdPartyAuthPrimaryPlainResDto responseData = primaryCtssService.requestCheck(userId, reqDto.getPassword(), clientIp);

        log.debug("CTSS 1차 인증 세션 설정 - 사용자ID: " + userId);
        final IntegrationLoginInfoDto integrationLoginInfoDto = new IntegrationLoginInfoDto();
        integrationLoginInfoDto.setUserName(responseData.getUserName());
        integrationLoginInfoDto.setOfficeNumber(responseData.getOfficeNumber());
        integrationLoginInfoDto.setPlainPhoneNumber(responseData.getPhoneNumber());
        integrationLoginInfoDto.setSystemType(ThirdPartySystemTypes.CTSS);
        integrationLoginInfoDto.setClientIp(HttpRequestUtils.getClientIp());

        IntegrationSessionManager.setPrimaryAuthSuccess(integrationLoginInfoDto);

        final LoginCtssResDto loginCtssResDto = new LoginCtssResDto();
        final String ctrsOtpSecretKey = otpService.getCtrsOtpSecretKey(responseData.getUserName(), responseData.getOfficeNumber(), responseData.getPhoneNumber());
        final String vmsOtpSecretKey = otpService.getVmsOtpSecretKey(responseData.getUserName(), responseData.getOfficeNumber(), responseData.getPhoneNumber());
        final String ctssOtpSecretKey = responseData.getOtpKey();
        log.debug(String.format("ctrs otp: %s, vms otp: %s, ctss otp: %s", ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey));

        if (otpService.hasUsableSecretKey(ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey)) {
            log.debug("OTP 키 사용 - 사용자ID: " + userId);
            IntegrationSessionManager.setOtpSecretKeys(ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey);
        } else {
            log.debug("새 OTP 키 생성 - 사용자ID: " + userId);
            final String otpSecretKey = otpService.generateSecretKeyAndSetSession();
            loginCtssResDto.setOtpSecretKey(otpSecretKey);
        }

        log.info("CTSS 1차 인증 성공 - 사용자ID: " + userId + ", IP: " + clientIp);
        return new ReturnData(loginCtssResDto);
    }
}
