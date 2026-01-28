package com.klid.webapp.common.controller;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.dto.ThirdPartyOtpInitializeCryptoReqDto;
import com.klid.webapp.common.dto.ThirdPartyOtpInitializePlainResDto;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.service.ThirdPartyCryptoService;
import com.klid.webapp.common.service.ThirdPartyRedirectService;
import com.klid.webapp.main.env.userManagementHistory.service.UserManagementHistoryService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/third-party/auth/otp")
@Slf4j
public class ThirdPartyOtpController {

    private final ThirdPartyCryptoService thirdPartyCryptoService;
    private final ThirdPartyRedirectService thirdPartyRedirectService;
    private final UserManagementHistoryService userManagementHistoryService;

    public ThirdPartyOtpController(final ThirdPartyCryptoService thirdPartyCryptoService,
                                   final ThirdPartyRedirectService thirdPartyRedirectService,
                                   final UserManagementHistoryService userManagementHistoryService) {
        this.thirdPartyCryptoService = thirdPartyCryptoService;
        this.thirdPartyRedirectService = thirdPartyRedirectService;
        this.userManagementHistoryService = userManagementHistoryService;
    }

    @PostMapping("initialize")
    public ResponseEntity<Map<String, Object>> initialize(@RequestBody ThirdPartyOtpInitializeCryptoReqDto reqDto) {
        log.info("OTP 초기화 요청 수신 - systemType: {}", reqDto.getSystemType());

        // 필수 필드 검증
        validateRequest(reqDto);

        final ThirdPartyOtpInitializePlainResDto plainDto = thirdPartyCryptoService.decryptThirdPartyOtpInitializeCryptoReqDto(reqDto);
        final UserDto userInfo = thirdPartyRedirectService.getUserInfo(plainDto.getUserName(), plainDto.getOfficeNumber(), plainDto.getPhoneNumber());
        if (userInfo == null) {
           throw new CustomException("사용자 정보를 찾을 수 없습니다.");
        }
        final int i = userManagementHistoryService.updateOtpInitializeByThirdParty(userInfo.getSeq(), plainDto.getReqUserId(), plainDto.getReqUserName());

        log.info("OTP 초기화 완료 - 사용자: {}, 결과: {}", userInfo.getUserId(), i > 0);
        return ResponseEntity.ok(new HashMap<String, Object>() {{
            put("user_name", userInfo.getUserName());
            put("result", i > 0);
        }});
    }

    private void validateRequest(ThirdPartyOtpInitializeCryptoReqDto reqDto) {
        // userName 검증 (암호화된 값)
        if (StringUtils.isBlank(reqDto.getUserName())) {
            log.warn("OTP 초기화 요청 실패 - userName 필드 누락");
            throw new CustomException("사용자명(userName)은 필수 입력 항목입니다.");
        }

        // phoneNumber 검증 (암호화된 값)
        if (StringUtils.isBlank(reqDto.getPhoneNumber())) {
            log.warn("OTP 초기화 요청 실패 - phoneNumber 필드 누락");
            throw new CustomException("전화번호(phoneNumber)는 필수 입력 항목입니다.");
        }

        // reqUserId 검증 (평문)
        if (StringUtils.isBlank(reqDto.getReqUserId())) {
            log.warn("OTP 초기화 요청 실패 - reqUserId 필드 누락");
            throw new CustomException("요청자 ID(reqUserId)는 필수 입력 항목입니다.");
        }

        // reqUserName 검증 (평문)
        if (StringUtils.isBlank(reqDto.getReqUserName())) {
            log.warn("OTP 초기화 요청 실패 - reqUserName 필드 누락");
            throw new CustomException("요청자명(reqUserName)은 필수 입력 항목입니다.");
        }

        // systemType 검증
        if (reqDto.getSystemType() == null) {
            log.warn("OTP 초기화 요청 실패 - systemType 필드 누락");
            throw new CustomException("시스템 타입(systemType)은 필수 입력 항목입니다.");
        }

        log.debug("OTP 초기화 요청 검증 완료 - 모든 필수 필드 유효");
    }
}
