package com.klid.common;

import org.apache.commons.lang3.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;

@Slf4j
public class HttpRequestUtils {

    public static String getClientIp() {
        final HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();
        final String xff = request.getHeader("X-Forwarded-For");
        log.debug("사용자 접속 [XFFS]: " + xff);
        if (StringUtils.isNotBlank(xff)) {
            for (String part : xff.split(",")) {
                final String ip = part.trim();
                log.debug("사용자 접속 IP[XFF]: " + ip);
                return ip;
            }
        }

        final String remoteAddr = request.getRemoteAddr();
        log.debug("사용자 접속 [RA]: " + remoteAddr);
        return remoteAddr;
    }
}
