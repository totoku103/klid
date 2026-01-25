package com.klid.webapp.common.exception;

public class ExpiredTokenException extends RuntimeException {
    private final static String message = "토큰이 만료되었습니다.";

    public ExpiredTokenException() {
        super(message);
    }

    public ExpiredTokenException(final String message) {
        super(message);
    }
}
