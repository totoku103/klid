package com.klid.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoginString {
    private final static String LOGIN = "/login.do";
    private final static Logger log = LoggerFactory.getLogger(LoginString.class);

    public static String getFullPath() {
        final String loginUrl = getPath();
        log.info("Login Path: " + loginUrl);
        return loginUrl;
    }

    public static String getPath() {
        return LOGIN;
    }
}
