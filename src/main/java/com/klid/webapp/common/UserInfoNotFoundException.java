package com.klid.webapp.common;

public class UserInfoNotFoundException extends RuntimeException {

    private final static String message = "%s 사용자 정보를 찾을 수 없습니다.";

    public UserInfoNotFoundException(String id) {
        super(String.format(message, id));
    }
}
