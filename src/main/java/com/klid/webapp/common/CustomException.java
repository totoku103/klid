
package com.klid.webapp.common;

@SuppressWarnings("serial")
public class CustomException extends RuntimeException {

    private String code;

    public CustomException(String message) {
        super(message);
    }

    public CustomException(String code, String message) {
        super(message);
        this.code = code;
    }

    public CustomException(String message, Throwable throwable) {
        super(message, throwable);
    }

    public String getCode() {
        return code;
    }
}
