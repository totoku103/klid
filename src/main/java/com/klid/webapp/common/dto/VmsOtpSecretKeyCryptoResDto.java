package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VmsOtpSecretKeyCryptoResDto {
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("is_saved")
    private boolean isSaved;

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public boolean isSaved() {
        return isSaved;
    }

    public void setSaved(final boolean saved) {
        isSaved = saved;
    }
}
