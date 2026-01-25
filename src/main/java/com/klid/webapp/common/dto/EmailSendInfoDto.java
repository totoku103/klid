package com.klid.webapp.common.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public class EmailSendInfoDto implements Serializable {
    private final String digit;
    private final LocalDateTime expiredTime = LocalDateTime.now().plusMinutes(5);

    public EmailSendInfoDto(final String digit) {
        this.digit = digit;
    }

    public String getDigit() {
        return digit;
    }

    public LocalDateTime getExpiredTime() {
        return expiredTime;
    }
}
