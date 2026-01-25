package com.klid.webapp.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SecurityFilter implements Filter {

	private Logger logger = LoggerFactory.getLogger(getClass());
	private FilterConfig filterConfig = null;

	@Override
	public void destroy() {
		this.filterConfig = null;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
						 FilterChain chain) {
		try {
			HttpServletRequest req = (HttpServletRequest) request;
			HttpServletResponse res = (HttpServletResponse) response;

			/** 보안관련 헤더설정 */
			res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-eval' 'unsafe-inline'");

			/**
			 * 목적 : MIME 형식 보안 위험 감소
			 * script 및 styleSheet 요소는 서버가 "X-Content-Type-Options: nosniff" 응답 헤더를 보내는 경우 잘못된 MIME 형식이 포함된 응답을 거부합니다. 
			 * 이는 MIME 형식 혼동을 기반으로 하는 공격을 차단하기 위한 보안 기능입니다.
			 * 이러한 변경 사항은 서버가 응답에서 "X-Content-Type-Options: nosniff" 헤더를 전송할 때 브라우저의 동작에 영향을 줍니다.
			 * styleSheet 참조가 수신한 응답에 "nosniff" 지시문이 포함된 경우, Windows Internet Explorer는 MIME 형식이 "text/css"와 일치할 때까지 "stylesheet" 파일을 로드하지 않습니다.
			 * script 참조로 검색한 응답에 "nosniff" 지시문이 포함된 경우, Internet Explorer는 MIME 형식이 다음 값 중 하나와 일치할 때까지 "script" 파일을 로드하지 않습니다
			 */
			res.addHeader("X-Content-Type-Options", "nosniff");

			/**
			 * 웹사이트에 프레임을 허용하는 것은 클릭재킹과 같은 공격에 취약하다.
			 * X-Frame-Options 를 DENY로 설정하면 웹브라우저는 프레임 내부에서 페이지가 렌더링되는 것을 막는다.
			 */
			res.setHeader("X-Frame-Options", "SAMEORIGIN");

			/**
			 * 웹브라우저의 내장 XSS Filter를 사용하도록 하는 옵션이다.
			 */
			res.setHeader("X-XSS-Protection", "1");

			/**
			 * 사이트 전체를 HTTPS연결을 사용하고 있는 경우, "이 사이트는 오직 HTTPS 연결만 지원합니다" 라고 알릴 수 있는 헤더옵션
			 * 이렇게 알려진 경우 브라우저가 해당 설정을 기억하여 HTTP로 접속시 스킵하고 HTTPS로 이동할 수 있으며, HTTP/HTTPS 양쪽이 세션을 공유하고 있을때 취약점도
			 * 커버할 수 있다. 그알림을 HTTP Strict Transport Security (이하 HSTS)라고 한다.
			 * Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
			 - Strict-Transport-Security : 이 사이트는 HTTPS 로만 운영되는 사이트이다.
			 - max-age=31536000 : 해당 설정을 31536000초 == (60 * 1440 * 365) == 1년간 유지한다.
			 - includeSubDomains : 현재 도메인의 하위 도메인까지 포함한다.
			 - preload : 브라우저가 이 설정을 기억하여 http접속시 접속을 하지않고 바로 https를 불러낸다.
			 */
			res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");


			// CORS 설정은 SecurityConfig에서 관리

			chain.doFilter(request, response);
		} catch (IOException e) {
			logger.error("IOException : " + e.getCause());
		} catch(ServletException e) {
			logger.error("ServletException : " + e.getCause());
		}
	}

	@Override
	public void init(FilterConfig filterConfig) {
		if(logger.isDebugEnabled()) logger.debug("SecurityFilter initialize");
		this.filterConfig = filterConfig;
	}

}
