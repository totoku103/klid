package com.klid.webapp.common.controller;

import com.klid.common.HttpRequestUtils;
import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.AuthenticatePrimaryCtrsResDto;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import com.klid.webapp.common.dto.LoginCtrsReqDto;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.service.GpkiService;
import com.klid.webapp.common.service.OtpService;
import com.klid.webapp.common.service.PrimaryCtrsService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login/ctrs/authenticate/primary")
public class LoginCtrsPrimaryController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final PrimaryCtrsService primaryCtrsService;
    private final OtpService otpService;
    private final GpkiService gpkiService;

    public LoginCtrsPrimaryController(final PrimaryCtrsService primaryCtrsService,
                                      final OtpService otpService,
                                      final GpkiService gpkiService) {
        this.primaryCtrsService = primaryCtrsService;
        this.otpService = otpService;
        this.gpkiService = gpkiService;
    }

    @PostMapping
    public ReturnData authenticatePrimary(@RequestBody LoginCtrsReqDto reqDto) {
        log.info(String.format("[%s] 1차 인증 요청 시작. id: %s, ip: %s", reqDto.getSystemType(), reqDto.getId(), reqDto.getClientIp()));
        try {
            validateRequest(reqDto);
            log.debug("요청 데이터 검증 완료");

            SessionManager.setLiteLoginInfo(reqDto.getId(), HttpRequestUtils.getClientIp(), ThirdPartySystemTypes.CTRS);
            final PrimaryCtrsService.LoginCheckType check = primaryCtrsService.check(reqDto.getId(), reqDto.getPassword(), reqDto.getClientIp());

            if (check == PrimaryCtrsService.LoginCheckType.OK) {
                log.info("CTRS 1차 인증 성공 - 사용자ID: " + reqDto.getId());
                return handleSuccessfulAuthentication(reqDto, check);
            }

            log.warn("CTRS 1차 인증 실패 - 사용자ID: " + reqDto.getId() + ", 실패 유형: " + check.name());
            return new ReturnData(new AuthenticatePrimaryCtrsResDto(check.name(), check.getMessage(), null));
        } catch (CustomException e) {
            log.warn("1차 인증 요청 실패: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("1차 인증 처리 중 예상치 못한 오류 발생", e);
            throw new CustomException("인증 처리 중 오류가 발생했습니다.");
        }
    }

    private void validateRequest(LoginCtrsReqDto reqDto) {
        if (reqDto == null) {
            throw new CustomException("요청 정보가 없습니다.");
        }
        if (StringUtils.isBlank(reqDto.getId())) {
            throw new CustomException("사용자 ID를 입력해주세요.");
        }
        if (StringUtils.isBlank(reqDto.getPassword())) {
            throw new CustomException("비밀번호를 입력해주세요.");
        }
    }

    private void setIntegrationSession(UserDto userDto) {
        final IntegrationLoginInfoDto integrationLoginInfoDto = new IntegrationLoginInfoDto();
        integrationLoginInfoDto.setUserName(userDto.getUserName());
        integrationLoginInfoDto.setOfficeNumber(userDto.getOffcTelNo());
        integrationLoginInfoDto.setPlainPhoneNumber(userDto.getMoblPhnNo());
        integrationLoginInfoDto.setSystemType(ThirdPartySystemTypes.CTRS);
        integrationLoginInfoDto.setClientIp(HttpRequestUtils.getClientIp());

        IntegrationSessionManager.setPrimaryAuthSuccess(integrationLoginInfoDto);
    }

    private ReturnData handleSuccessfulAuthentication(LoginCtrsReqDto reqDto, PrimaryCtrsService.LoginCheckType check) {
        final String userId = reqDto.getId();
        final String clientIp = reqDto.getClientIp();

        final UserDto user = SessionManager.getIntegrateUser();
        if (user == null) {
            log.error("사용자 정보를 찾을 수 없음. userId: " + userId);
            throw new CustomException("사용자 정보를 찾을 수 없습니다.");
        }

        setIntegrationSession(user);
        final String userName = user.getUserName();
        final String officeNumber = user.getOffcTelNo();
        final String plainPhoneNumber = user.getMoblPhnNo();

//        GPKI 정보 셋팅
        final String ctrsGpkiSerialNumber = gpkiService.getCtrsGpkiSerialNumber(userId);
        if (StringUtils.isNotBlank(ctrsGpkiSerialNumber))
            IntegrationSessionManager.setGpkiSerialNumber(ctrsGpkiSerialNumber);

//        OTP 정보 셋팅
        final String ctrsOtpSecretKey = otpService.getCtrsOtpSecretKey(userName, officeNumber, plainPhoneNumber);
        final String vmsOtpSecretKey = otpService.getVmsOtpSecretKey(userName, officeNumber, plainPhoneNumber);
        final String ctssOtpSecretKey = otpService.getCtssOtpSecretKey(userName, officeNumber, plainPhoneNumber);

        log.debug(String.format("ctrs otp: %s, vms otp: %s, ctss otp: %s", ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey));

        if (otpService.hasUsableSecretKey(ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey)) {
            log.debug("OTP 키 사용 - 사용자ID: " + reqDto.getId());
            IntegrationSessionManager.setOtpSecretKeys(ctrsOtpSecretKey, vmsOtpSecretKey, ctssOtpSecretKey);
            return new ReturnData(new AuthenticatePrimaryCtrsResDto(check.name(), check.getMessage(), null));
        } else {
            log.debug("새 OTP 키 생성 - 사용자ID: " + reqDto.getId());
            final String secretKey = otpService.generateSecretKeyAndSetSession();
            return new ReturnData(new AuthenticatePrimaryCtrsResDto(check.name(), check.getMessage(), secretKey));
        }
    }

}
