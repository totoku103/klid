package com.klid.webapp.common.security;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * 커스텀 인증 완료 후 Spring Security 인증 컨텍스트를 설정하는 서비스
 */
@Service
@Slf4j
public class SecurityAuthenticationService {

    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();

    /**
     * 2차 인증 성공 후 Spring Security 인증 컨텍스트를 설정합니다.
     * SecurityContextHolder에 Authentication 객체를 저장하고
     * 세션에도 SecurityContext를 저장합니다.
     */
    public void setSecurityAuthentication() {
        final IntegrationLoginInfoDto loginInfo = IntegrationSessionManager.getIntegrationLoginInfo();
        if (loginInfo == null) {
            log.warn("Spring Security 인증 설정 실패 - 통합 로그인 정보 없음");
            return;
        }

        final String userId = loginInfo.getPk();
        final CustomUserDetails userDetails = new CustomUserDetails(userId, "");

        final Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        // SecurityContext 생성 및 Authentication 설정
        SecurityContext context = securityContextHolderStrategy.createEmptyContext();
        context.setAuthentication(authentication);
        securityContextHolderStrategy.setContext(context);

        // 세션에 SecurityContext 저장
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            HttpServletResponse response = attributes.getResponse();
            securityContextRepository.saveContext(context, request, response);
            log.info("Spring Security 인증 컨텍스트 설정 및 세션 저장 완료 - 사용자ID: " + userId);
        } else {
            log.warn("Spring Security 인증 컨텍스트 설정 완료, 세션 저장 실패 - RequestAttributes 없음");
        }
    }

    /**
     * Spring Security 인증 컨텍스트를 초기화합니다.
     */
    public void clearSecurityAuthentication() {
        SecurityContextHolder.clearContext();
        log.info("Spring Security 인증 컨텍스트 초기화 완료");
    }
}
