package com.klid.webapp.common.exception;

public class TamperedTokenException extends RuntimeException {
    private final static String message = "토큰 정보가 위변조 되었습니다.";

    public TamperedTokenException() {
        super(message);
    }

    public TamperedTokenException(final String message) {
        super(message);
    }
}
