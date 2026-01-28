package com.klid.webapp.common.controller;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.IntegrationSessionManager;
import com.klid.common.SEED_KISA256;
import com.klid.common.util.RedirectTokenUtil;
import com.klid.webapp.common.ResourceNotFoundException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import com.klid.webapp.common.dto.LoginRedirectReqDto;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.exception.ExpiredTokenException;
import com.klid.webapp.common.exception.TamperedTokenException;
import com.klid.webapp.common.login.service.LoginServiceImpl;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import com.klid.webapp.common.security.SecurityAuthenticationService;
import com.klid.webapp.common.service.PrimaryCtrsService;
import com.klid.webapp.common.service.ThirdPartyRedirectService;
import com.klid.webapp.main.thirdparty.redirect.dto.SimpleTokenInfoDto;
import com.klid.webapp.main.thirdparty.redirect.service.TokenInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Controller
@Slf4j
public class CtrsRedirectViewController {
    public final static String REDIRECT_URL = "/ctrs/redirect.do";
    private final PrimaryCtrsService primaryCtrsService;
    private final TokenInfoService tokenInfoService;
    private final ThirdPartyProperty thirdPartyProperty;
    private final ThirdPartyRedirectService thirdPartyRedirectService;
    private final SecurityAuthenticationService securityAuthenticationService;

    public CtrsRedirectViewController(final PrimaryCtrsService primaryCtrsService,
                                      final TokenInfoService tokenInfoService,
                                      final ThirdPartyProperty thirdPartyProperty,
                                      final ThirdPartyRedirectService thirdPartyRedirectService,
                                      final SecurityAuthenticationService securityAuthenticationService) {
        this.primaryCtrsService = primaryCtrsService;
        this.tokenInfoService = tokenInfoService;
        this.thirdPartyProperty = thirdPartyProperty;
        this.thirdPartyRedirectService = thirdPartyRedirectService;
        this.securityAuthenticationService = securityAuthenticationService;
    }

    @GetMapping(REDIRECT_URL)
    public ModelAndView redirect(HttpServletRequest request, @RequestParam String token) {
        log.info("리다이렉트 요청 시작. ");
        log.debug("리다이렉트 요청 시작. " + token);

        final SimpleTokenInfoDto tokenInfo = tokenInfoService.getTokenInfo(token);
        if (tokenInfo == null) {
            log.warn("토큰 정보 없음 - TOKEN: " + token);
            throw new ResourceNotFoundException("Token 정보를 찾을 수 없습니다.");
        }

        log.debug("토큰 정보 조회 성공 - 사용자ID: " + tokenInfo.getUserId() + ", 만료시간: " + tokenInfo.getExpiredAt());

        // Database 토큰 정보 확인
        if (tokenInfo.getExpiredAt().before(Timestamp.valueOf(LocalDateTime.now()))) {
            log.warn("만료된 토큰 접근 시도 - 사용자ID: " + tokenInfo.getUserId() + ", IP: " + tokenInfo.getClientIp() + ", 만료시간: " + tokenInfo.getExpiredAt());
            tokenInfoService.editOnlyExpiredByToken(token);
            throw new ExpiredTokenException("Token 정보가 만료 되었습니다.");
        }

        try {
            // 애초에 토큰을 변조하면 Database에서 못찾음.
            final UserDto userInfoByOnlyId = primaryCtrsService.getUserInfoByOnlyId(tokenInfo.getUserId());
            log.debug("사용자 정보 조회 성공 - 사용자ID: " + tokenInfo.getUserId());

            final String secretKey = RedirectTokenUtil.getSecretKey(userInfoByOnlyId);
            final boolean tokenFirstCheck = RedirectTokenUtil.verifyToken(secretKey, token);
            if (!tokenFirstCheck) {
                log.error("토큰 검증 실패 - 변조 의심, 사용자ID: " + tokenInfo.getUserId());
                throw new TamperedTokenException("토큰 정보 불량");
            }
            log.debug("토큰 검증 성공 - 사용자ID: " + tokenInfo.getUserId());

        } catch (PrimaryCtrsService.NotFoundDataByIdException e) {
            log.error("사용자 정보 조회 실패 - 사용자ID: " + tokenInfo.getUserId());
            throw new RuntimeException("사용자 정보를 찾을 수 없습니다.");
        }

        // 정상 로그인 처리
        log.info("정상 로그인 처리 시작 - 사용자ID: " + tokenInfo.getUserId());
        primaryCtrsService.processNormalityLogin(tokenInfo.getUserId(), tokenInfo.getClientIp());

        // 토큰 사용 처리
        log.debug("토큰 사용 처리 - 사용자ID: " + tokenInfo.getUserId());
        tokenInfoService.editExpiredAndUsedByToken(token);
        IntegrationSessionManager.setThirdPartyRedirectConnect();

        final LoginRedirectReqDto loginRedirectReqDto = new LoginRedirectReqDto();
        loginRedirectReqDto.setId(tokenInfo.getUserId());
        loginRedirectReqDto.setClientIp(tokenInfo.getClientIp());
        loginRedirectReqDto.setSystemType(tokenInfo.getSystemType());

        final UserDto userInfo = thirdPartyRedirectService.getUserInfo(tokenInfo.getUserId());
        final IntegrationLoginInfoDto integrationLoginInfoDto = new IntegrationLoginInfoDto();
        integrationLoginInfoDto.setUserName(userInfo.getUserName());
        integrationLoginInfoDto.setOfficeNumber(userInfo.getOffcTelNo());
        integrationLoginInfoDto.setPlainPhoneNumber(SEED_KISA256.Decrypt(userInfo.getMoblPhnNo()));
        integrationLoginInfoDto.setSystemType(tokenInfo.getSystemType());
        integrationLoginInfoDto.setClientIp(tokenInfo.getClientIp());

        IntegrationSessionManager.setPrimaryAuthSuccess(integrationLoginInfoDto);
        IntegrationSessionManager.setSecondAuthSuccess();
        securityAuthenticationService.setSecurityAuthentication();
        SessionManager.setLiteLoginInfo(tokenInfo.getUserId(), tokenInfo.getClientIp(), tokenInfo.getSystemType());
        // 레거시 로그인과 구분하기 위한 값
        SessionManager.getSession().setAttribute(LoginServiceImpl.SESSION_ATTRIBUTE_LEGACY, false);

        final ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName(String.format("redirect:%s/main/main.do", thirdPartyProperty.getCtrsUrlHost()));
        log.info("리다이렉트 처리 완료 - 사용자ID: " + tokenInfo.getUserId());
        return modelAndView;
    }

    private ModelAndView getDefaultErrorModel(String redirectMessage) {
        final ModelAndView modelAndView = new ModelAndView("/error.do");
        modelAndView.addObject("redirectMessage", redirectMessage);
        return modelAndView;
    }

    @ExceptionHandler(RuntimeException.class)
    public ModelAndView handleException(RuntimeException e, HttpServletRequest request) {
        final String clientIp = request.getRemoteHost();
        final String sessionId = request.getSession().getId();
        final String exceptionType = e.getClass().getSimpleName();

        log.error("리다이렉트 예외 발생 - 타입: " + exceptionType + ", 메시지: " + e.getMessage() + ", IP: " + clientIp + ", SessionID: " + sessionId, e);

        return getDefaultErrorModel(e.getMessage());
    }
}
