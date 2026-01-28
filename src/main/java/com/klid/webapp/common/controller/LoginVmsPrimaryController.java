package com.klid.webapp.common.controller;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.HttpRequestUtils;
import com.klid.common.IntegrationSessionManager;
import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import com.klid.webapp.common.dto.LoginVmsReqDto;
import com.klid.webapp.common.dto.LoginVmsResDto;
import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryPlainResDto;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.service.OtpService;
import com.klid.webapp.common.service.PrimaryVmsServiceI;
import me.totoku103.crypto.java.sha2.Sha512;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/login/vms/authenticate/primary")
@Slf4j
public class LoginVmsPrimaryController {

    private final PrimaryVmsServiceI primaryVmsService;
    private final OtpService otpService;

    public LoginVmsPrimaryController(final PrimaryVmsServiceI primaryVmsService,
                                     final OtpService otpService) {
        this.primaryVmsService = primaryVmsService;
        this.otpService = otpService;
    }

    @PostMapping
    public ReturnData authenticatePrimary(@RequestBody LoginVmsReqDto reqDto) {
        log.info(String.format("[%s] 1차 인증 요청 시작. id: %s, ip: %s", reqDto.getSystemType(), reqDto.getId(), reqDto.getClientIp()));

        final String userId = reqDto.getId();
        final String clientIp = reqDto.getClientIp();

        if (StringUtils.isBlank(userId)) {
            log.warn("VMS 인증 실패 - 사용자 ID 누락, IP: " + clientIp);
            throw new CustomException("사용자 ID를 입력해주세요.");
        }
        if (StringUtils.isBlank(reqDto.getPassword())) {
            log.warn("VMS 인증 실패 - 비밀번호 누락, 사용자ID: " + userId + ", IP: " + clientIp);
            throw new CustomException("비밀번호를 입력해주세요.");
        }

        log.debug("VMS 외부 시스템 인증 요청 - 사용자ID: " + userId + ", IP: " + clientIp);
        SessionManager.setLiteLoginInfo(userId, clientIp, ThirdPartySystemTypes.VMS);
        final ThirdPartyAuthPrimaryPlainResDto responseData = primaryVmsService.requestCheck(userId, reqDto.getPassword(), clientIp);

        final IntegrationLoginInfoDto integrationLoginInfoDto = new IntegrationLoginInfoDto();
        integrationLoginInfoDto.setUserName(responseData.getUserName());
        integrationLoginInfoDto.setOfficeNumber(responseData.getOfficeNumber());
        integrationLoginInfoDto.setPlainPhoneNumber(responseData.getPhoneNumber());
        integrationLoginInfoDto.setSystemType(ThirdPartySystemTypes.VMS);
        integrationLoginInfoDto.setClientIp(clientIp);

        IntegrationSessionManager.setPrimaryAuthSuccess(integrationLoginInfoDto);

        final LoginVmsResDto loginVmsResDto = new LoginVmsResDto();

        // GPKI 정보 셋팅
        final String vmsGpkiSerialNumber = responseData.getGpkiKey();
        if (StringUtils.isNotBlank(vmsGpkiSerialNumber)) {
            final Sha512 sha512 = new Sha512();
            final String encryptSerialNumber = sha512.encrypt(vmsGpkiSerialNumber.getBytes(StandardCharsets.UTF_8));
            IntegrationSessionManager.setGpkiSerialNumber(encryptSerialNumber);
        }

        // OTP 정보 셋팅
        final String ctrsOtpSecretKey = otpService.getCtrsOtpSecretKey(responseData.getUserName(), responseData.getOfficeNumber(), responseData.getPhoneNumber());
        final String vmsOtpSecretKey = responseData.getOtpKey();
        final String ctssOtpSecretKey = otpService.getCtssOtpSecretKey(responseData.getUserName(), responseData.getOfficeNumber(), responseData.getPhoneNumber());
        log.debug(String.format("ctrs otp: %s, vms otp: %s, ctss otp: %s", ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey));

        if (otpService.hasUsableSecretKey(ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey)) {
            log.debug("OTP 키 사용 - 사용자ID: " + userId);
            IntegrationSessionManager.setOtpSecretKeys(ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey);
        } else {
            log.debug("새 OTP 키 생성 - 사용자ID: " + userId);
            final String otpSecretKey = otpService.generateSecretKeyAndSetSession();
            loginVmsResDto.setOtpSecretKey(otpSecretKey);
        }

        loginVmsResDto.setEmail(responseData.getEmail());
        loginVmsResDto.setGpkiKey(responseData.getGpkiKey());

        log.info("VMS 1차 인증 성공 - 사용자ID: " + userId + ", IP: " + clientIp);
        return new ReturnData(loginVmsResDto);
    }
}
