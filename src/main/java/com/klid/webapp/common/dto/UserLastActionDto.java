package com.klid.webapp.common.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public class UserLastActionDto implements Serializable {
    private final String action;
    private final LocalDateTime actionTime = LocalDateTime.now();

    public UserLastActionDto(final String action) {
        this.action = action;
    }

    public String getAction() {
        return action;
    }

    public LocalDateTime getActionTime() {
        return actionTime;
    }
}
