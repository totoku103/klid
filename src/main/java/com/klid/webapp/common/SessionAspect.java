package com.klid.webapp.common;


import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.dto.UserDto;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@Aspect
@Component
@Slf4j
public class SessionAspect {
    @Before("execution(* com.klid.webapp.main.controller..*.*(..)) && args(param)")
    public void before(JoinPoint joinPoint, Map<String, Object> param) {
        setMainAuth(joinPoint, param);
    }

    private void setMainAuth(JoinPoint joinPoint, Map<String, Object> param) {
        final Object reqAuthMain = param.get("sAuthMain");
        if (reqAuthMain == null) return;
        log.debug("요청 내 sAuthMain 값 존재 확인.");

        final ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (sra == null) return;

        final HttpServletRequest request = sra.getRequest();
        final String method = request.getMethod();
        if (!"GET".equalsIgnoreCase(method)) return;

        final UserDto user = SessionManager.getUser();
        if (user == null) return;

        final String sessAuthMain = user.getAuthMain();
        if (StringUtils.isNotBlank(sessAuthMain) && !sessAuthMain.equals(reqAuthMain)) {
            log.debug("sAuthMain 변조 확인. req: " + String.valueOf(reqAuthMain) + ", session: " + String.valueOf(sessAuthMain));
            param.put("sAuthMain", sessAuthMain);

            log.info("메인 권한 값 주입 완료. " + joinPoint.getSignature().toLongString());
        }
    }
}
