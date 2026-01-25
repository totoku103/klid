package com.klid.webapp.common;

import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.login.persistence.LoginMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.support.WebApplicationContextUtils;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpSessionAttributeListener;
import jakarta.servlet.http.HttpSessionBindingEvent;
import jakarta.servlet.http.HttpSessionEvent;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class SessionAttributeLogger implements HttpSessionAttributeListener {

    private final static Logger log = LoggerFactory.getLogger(SessionAttributeLogger.class);
    private final static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    private LoginMapper getLoginMapper(HttpSessionEvent event) {
        final HttpSession session = event.getSession();
        final ServletContext servletContext = session.getServletContext();

        return WebApplicationContextUtils.getWebApplicationContext(servletContext).getBean("loginMapper", LoginMapper.class);
    }

    private void insertUserLogoutHistory(LoginMapper loginMapper, String userId, String clientIp) {
        try {
            final Map<String, Object> map = new HashMap<>();
            map.put("userId", userId);
            map.put("usrIp", clientIp);
            map.put("logCd", "OUT");
            map.put("menuCd", "로그아웃");
            map.put("remark", "로그아웃");

            log.info("데이터베이스에 로그아웃 이력 저장 중...");
            loginMapper.insertUserLog(map);
        } catch (IllegalStateException e) {
            log.error("로그아웃 이력 저장 중 IllegalStateException 발생: " + e.getMessage() + ". userId: + " + userId + ", clientIp: " + clientIp, e);
        } catch (NullPointerException e) {
            log.error("로그아웃 이력 저장 중 NullPointerException 발생: " + e.getMessage() + ". userId: + " + userId + ", clientIp: " + clientIp, e);
        } catch (Exception e) {
            log.error("로그아웃 이력 저장 중 예외 발생: " + e.getMessage() + ". userId: + " + userId + ", clientIp: " + clientIp, e);
            log.error("예외 타입: " + e.getClass().getName());
        }
    }

    @Override
    public void attributeAdded(final HttpSessionBindingEvent httpSessionBindingEvent) {
        if (!SessionManager.LITE_LOGIN_INFO_KEY.equalsIgnoreCase(httpSessionBindingEvent.getName())) return;

        final HttpSession session = httpSessionBindingEvent.getSession();
        final String sessionId = session.getId();
        final long creationTime = session.getCreationTime();
        final int maxInactiveInterval = session.getMaxInactiveInterval();
        log.info("========================================");
        log.info("[세션 생성]");
        log.info("세션 ID: " + sessionId);
        log.info("생성 시간: " + dateFormat.format(new Date(creationTime)));
        log.info("최대 비활성 시간: " + maxInactiveInterval + "초 (" + (maxInactiveInterval / 60) + "분)");
        log.info("========================================");
    }

    @Override
    public void attributeRemoved(final HttpSessionBindingEvent httpSessionBindingEvent) {
        if (!SessionManager.LITE_LOGIN_INFO_KEY.equalsIgnoreCase(httpSessionBindingEvent.getName())) return;

        final HttpSession session = httpSessionBindingEvent.getSession();
        final String sessionId = session.getId();
        final SessionManager.LiteLoginInfo dto = (SessionManager.LiteLoginInfo) httpSessionBindingEvent.getValue();

        if (!ThirdPartySystemTypes.CTRS.equals(dto.getSystemType())) return;

        final LoginMapper loginMapper = getLoginMapper(httpSessionBindingEvent);
        insertUserLogoutHistory(loginMapper, dto.getUserId(), dto.getClientIp());

        try {
            log.info("========================================");
            log.info("[세션 종료]");
            log.info("세션 ID: " + sessionId);
            log.info("LITE LOGIN INFO:" + dto);
            log.info("========================================");
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void attributeReplaced(final HttpSessionBindingEvent httpSessionBindingEvent) {

    }
}
