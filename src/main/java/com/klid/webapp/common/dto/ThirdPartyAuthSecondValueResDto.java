package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ThirdPartyAuthSecondValueResDto {
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("is_saved")
    private String isSaved;

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public String isSaved() {
        return isSaved;
    }

    public void setSaved(final String saved) {
        isSaved = saved;
    }

    @Override
    public String toString() {
        return "ThirdPartyAuthSecondValueResDto{" +
                "userId='" + userId + '\'' +
                ", isSaved=" + isSaved +
                '}';
    }
}
