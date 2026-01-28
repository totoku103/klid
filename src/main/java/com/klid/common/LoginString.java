package com.klid.common;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginString {
    private final static String LOGIN = "/login.do";

    public static String getFullPath() {
        final String loginUrl = getPath();
        log.info("Login Path: " + loginUrl);
        return loginUrl;
    }

    public static String getPath() {
        return LOGIN;
    }
}
