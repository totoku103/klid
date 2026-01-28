package com.klid.webapp.common.controller;

import lombok.extern.slf4j.Slf4j;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.klid.webapp.common.UserInfoNotFoundException;
import com.klid.webapp.common.UserInfoStatusCheckException;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.dto.CtrsRedirectCryptoReqDto;
import com.klid.webapp.common.dto.CtrsRedirectPlainReqDto;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import com.klid.webapp.common.service.PrimaryCtrsService;
import com.klid.webapp.common.service.ThirdPartyCryptoService;
import com.klid.webapp.common.service.ThirdPartyRedirectService;
import com.klid.webapp.main.thirdparty.redirect.dto.SimpleSaveTokenInfoDto;
import com.klid.webapp.main.thirdparty.redirect.service.TokenInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/third-party/auth")
@Slf4j
public class CtrsRedirectController {


    private final TokenInfoService tokenInfoService;
    private final PrimaryCtrsService primaryCtrsService;
    private final ThirdPartyCryptoService thirdPartyCryptoService;
    private final ThirdPartyRedirectService thirdPartyRedirectService;

    public CtrsRedirectController(final TokenInfoService tokenInfoService,
                                  final PrimaryCtrsService primaryCtrsService,
                                  final ThirdPartyCryptoService thirdPartyCryptoService,
                                  final ThirdPartyRedirectService thirdPartyRedirectService) {
        this.tokenInfoService = tokenInfoService;
        this.primaryCtrsService = primaryCtrsService;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
        this.thirdPartyRedirectService = thirdPartyRedirectService;
    }

    @PostMapping("/redirect")
    public ResponseEntity<ThirdPartyBaseResDto> generateRedirectToken(@RequestBody CtrsRedirectCryptoReqDto requestDto) {
        log.info("타 시스템에서 리다이렉트 토큰 생성 요청. " + requestDto);

        final CtrsRedirectPlainReqDto reqDto = thirdPartyCryptoService.decryptCtrsRedirectCryptoReqDto(requestDto);
        final UserDto userInfo = thirdPartyRedirectService.getUserInfo(reqDto.getUserName(), reqDto.getOfficeNumber(), reqDto.getPhoneNumber());
        final String pk = reqDto.getUserName() + " " + reqDto.getOfficeNumber() + " " + reqDto.getPhoneNumber();

        if (userInfo == null) {
            log.warn("사용자 정보 조회 실패 - 존재하지 않는 사용자 이름: {}, {}, {}", reqDto.getUserName(), reqDto.getOfficeNumber(), reqDto.getPhoneNumber());
            throw new UserInfoNotFoundException(pk);
        }
        log.debug("사용자 정보 조회 성공 - " + pk);

        final PrimaryCtrsService.LoginCheckType loginCheckType = primaryCtrsService.validateLoginPolicy(userInfo, reqDto.getClientIp());
        if (loginCheckType != null) {
            final String message = loginCheckType.getMessage();
            log.warn("로그인 정책 검증 실패 - {} - {} - {}", loginCheckType, pk, message);
            switch (loginCheckType) {
                case LOCK:
                case RESET:
                case EXPIRE:
                case MISS_MATCH_IP:
                case INACTIVE:
                    throw new UserInfoStatusCheckException(message);
            }
        }
        final String redirectUrl;
        try {
            log.debug("리다이렉트 URL 생성 시작 - " + pk + ", 시스템타입: " + reqDto.getSystemType());
            final SimpleSaveTokenInfoDto simpleSaveTokenInfoDto = thirdPartyRedirectService.buildRedirectUrl(reqDto.getUserName(), reqDto.getOfficeNumber(), reqDto.getPhoneNumber(), reqDto.getClientIp(), reqDto.getSystemType());
            log.debug("토큰 저장 시작 - 토큰: " + simpleSaveTokenInfoDto.getToken() + ", 만료시간: " + simpleSaveTokenInfoDto.getExpiredAt());
            tokenInfoService.saveToken(simpleSaveTokenInfoDto);
            redirectUrl = thirdPartyRedirectService.getRedirect(simpleSaveTokenInfoDto.getToken());
            log.debug("리다이렉트 URL 생성 완료 - URL: " + redirectUrl);
        } catch (UnsupportedEncodingException e) {
            log.error("리다이렉트 URL 생성 중 인코딩 오류 발생 - " + pk, e);
            throw new RuntimeException(e);
        }

        final ResponseDto responseDto = new ResponseDto();
        responseDto.setRedirectUrl(redirectUrl);

        final ThirdPartyBaseResDto<ResponseDto> responseDtoThirdPartyBaseResDto = new ThirdPartyBaseResDto<>(ThirdPartyResponseStatusCodes.SUCCESS);
        responseDtoThirdPartyBaseResDto.setData(responseDto);

        log.info("타사 시스템 리다이렉트 토큰 요청 완료 - " + pk + ", 시스템타입: " + reqDto.getSystemType());
        return ResponseEntity.ok(responseDtoThirdPartyBaseResDto);
    }

    public static class ResponseDto {
        @JsonProperty("redirect_url")
        private String redirectUrl;

        public String getRedirectUrl() {
            return redirectUrl;
        }

        public void setRedirectUrl(final String redirectUrl) {
            this.redirectUrl = redirectUrl;
        }
    }
}
