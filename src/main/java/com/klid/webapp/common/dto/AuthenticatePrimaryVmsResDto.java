package com.klid.webapp.common.dto;

import org.apache.commons.lang3.StringUtils;

public class AuthenticatePrimaryVmsResDto {
    private final String code;
    private final String message;
    private final String otpSecretKey;

    public AuthenticatePrimaryVmsResDto(final String code,
                                        final String message,
                                        final String otpSecretKey) {
        this.code = code;
        this.message = message;
        this.otpSecretKey = otpSecretKey;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getOtpSecretKey() {
        return otpSecretKey;
    }

    public boolean hasOtpSecretKey() {
        return StringUtils.isBlank(otpSecretKey);
    }
}
