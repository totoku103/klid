package com.klid.webapp.common.security;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.HttpRequestUtils;
import com.klid.common.IntegrationSessionManager;
import com.klid.common.LoginString;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.login.service.LoginServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 2단계 인증(1차 + 2차) 검증 필터
 * 기존 LoginCheckInterceptor의 로직을 Spring Security Filter로 마이그레이션
 */
@Component
@Slf4j
public class TwoFactorAuthenticationFilter extends OncePerRequestFilter {

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    // CTSS 도메인 화이트리스트 (1차 인증만 필요)
    private final Set<String> ctssWhitelist = new HashSet<>(Arrays.asList(
            "/main/ctss/page-redirect.do",
            "/api/main/ctss/redirect/auth"
    ));

    // 필터 제외 패턴 (SecurityConfig의 permitAll과 동일)
    private final List<String> excludedPatterns = Arrays.asList(
            // 정적 리소스
            "/lib/**",
            "/js/**",
            "/img/**",
            "/css/**",
            "/webjars/**",
            "/WEB-INF/**",
            // 로그인 관련
            "/",
            "/login.do",
            "/error.do",
            "/main/login.do",
            "/api/login/**",
            "/api/login/ctrs/authenticate/**",
            "/api/login/vms/authenticate/**",
            "/api/login/ctss/authenticate/**",
            // 계정 등록
            "/main/popup/env/pAccountAdd.do",
            "/api/main/env/userConf/addAccount.do",
            // 비밀번호 만료
            "/main/popup/env/expire/pUserPasswordChange.do",
            "/api/main/env/userConf/expire/passwordCheck",
            // 개인정보처리방침
            "/main/popup/sys/pPolicyInfo",
            "/main/popup/sys/pPolicyInfo.do",
            "/main/popup/compare-privacy-policy/**",
            "/main/popup/privacy-policy/**",
            // VMS/CTSS 연동
            "/api/main/vms/privacy-policy",
            "/main/vms/sign-up.do",
            "/main/vms/privacy-policy.do",
            "/api/main/ctss/privacy-policy",
            "/main/ctss/sign-up.do",
            "/main/ctss/privacy-policy.do",
            // 외부 연동 및 인증
            "/gpki/**",
            "/gpkisecureweb/client/setup/GPKISecureWebSetup.exe",
            "/api/third-party/auth/redirect.do",
            "/api/third-party/auth/otp/initialize.do",
            "/ctrs/redirect.do",
            "/authenticate/otp/ctrs.do",
            // 기타
            "/main/popup/silverlight/**",
            "/api/common/code/getCodeListByCodeKind.do",
            "/test"
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String requestPath = request.getRequestURI();
        return excludedPatterns.stream()
                .anyMatch(pattern -> pathMatcher.match(pattern, requestPath));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final HttpSession session = SessionManager.getSession();
        final String sessionId = session.getId();
        final String requestURI = request.getRequestURI();
        final String method = request.getMethod();
        final String clientIP = HttpRequestUtils.getClientIp();

        log.info("2단계 인증 필터 시작 - SessionID: {}, URI: {}, Method: {}, ClientIP: {}",
                sessionId, requestURI, method, clientIP);

        try {
            final UserDto user = SessionManager.getUser();
            log.debug("사용자 세션 정보 확인 - SessionID: {}, UserInfo: {}", sessionId, user);

            // CTSS 도메인 요청 예외 처리
            if (ctssWhitelist.contains(requestURI)) {
                log.info("CTSS 도메인 리다이렉트 요청 - SessionID: {}", sessionId);

                if (IntegrationSessionManager.isAuthenticatePrimary()) {
                    log.info("CTSS 도메인 접근 허용 - 1차 인증 완료, SessionID: {}", sessionId);
                    filterChain.doFilter(request, response);
                    return;
                } else {
                    log.warn("CTSS 도메인 접근 거부 - 1차 인증 미완료, SessionID: {}", sessionId);
                    return;
                }
            }

            // 사용자 세션 검사
            if (user == null) {
                log.debug("사용자 세션이 없음 - 통합인증 상태 확인 시작");

                // 통합 인증 상태 확인
                if (IntegrationSessionManager.isAuthenticateAll()) {
                    log.info("통합인증 완료 상태 - 접근 허용, SessionID: {}", sessionId);
                    filterChain.doFilter(request, response);
                    return;
                }

                // URL 예외 처리
                if (requestURI.contains("expire")) {
                    log.info("비밀번호 만료검사 URL 예외 처리 - SessionID: {}, URI: {}", sessionId, requestURI);
                    filterChain.doFilter(request, response);
                    return;
                } else if (requestURI.contains("code")) {
                    log.info("코드 관련 URL 예외 처리 - SessionID: {}, URI: {}", sessionId, requestURI);
                    filterChain.doFilter(request, response);
                    return;
                } else {
                    log.warn("로그인되지 않은 사용자 접근 차단 - SessionID: {}, URI: {}", sessionId, requestURI);
                    redirectLoginPage(response);
                    return;
                }
            }

            // 레거시 로그인 플래그 확인
            final Object attribute = session.getAttribute(LoginServiceImpl.SESSION_ATTRIBUTE_LEGACY);
            if (attribute != null) {
                final boolean isLegacyLogin = (boolean) attribute;
                if (isLegacyLogin) {
                    filterChain.doFilter(request, response);
                    return;
                }
            }

            log.debug("사용자 세션 존재 확인 - SessionID: {}, UserID: {}", sessionId, user.getUserId());

            // 리다이렉트 접속 사용자 처리
            final boolean isRedirect = IntegrationSessionManager.isThirdPartyRedirectConnect();
            log.debug("리다이렉트 접속 상태 확인 - SessionID: {}, IsRedirect: {}", sessionId, isRedirect);

            if (isRedirect) {
                log.info("리다이렉트 접속 사용자 접근 허용 - SessionID: {}, UserID: {}", sessionId, user.getUserId());
                filterChain.doFilter(request, response);
                return;
            }

            // 일반 로그인 인증 상태 검사
            final boolean isAuthenticatedPrimary = IntegrationSessionManager.isAuthenticatePrimary();
            final boolean isAuthenticateSecond = IntegrationSessionManager.isAuthenticateSecond();

            log.debug("인증 상태 확인 - SessionID: {}, 1차인증: {}, 2차인증: {}",
                    sessionId, isAuthenticatedPrimary, isAuthenticateSecond);

            if (isAuthenticatedPrimary && isAuthenticateSecond) {
                log.info("1차, 2차 인증 완료 사용자 접근 허용 - SessionID: {}, UserID: {}",
                        sessionId, user.getUserId());
                filterChain.doFilter(request, response);
            } else {
                log.warn("1차, 2차 인증 미완료 사용자 접근 차단 - SessionID: {}, UserID: {}, 1차인증: {}, 2차인증: {}",
                        sessionId, user.getUserId(), isAuthenticatedPrimary, isAuthenticateSecond);
                redirectLoginPage(response);
            }

        } catch (Exception e) {
            log.error("2단계 인증 필터에서 예외 발생 - SessionID: {}, URI: {}", sessionId, requestURI, e);
            throw e;
        }
    }

    private void redirectLoginPage(HttpServletResponse response) throws IOException {
        final String loginUrl = LoginString.getFullPath();
        log.info("로그인 페이지로 리다이렉트 시작 - URL: {}", loginUrl);

        try {
            response.sendRedirect(loginUrl);
            log.debug("로그인 페이지 리다이렉트 완료");
        } catch (IOException e) {
            log.error("로그인 페이지 리다이렉트 실패", e);
            throw e;
        }
    }
}
