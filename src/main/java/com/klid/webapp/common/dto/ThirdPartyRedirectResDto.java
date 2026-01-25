package com.klid.webapp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ThirdPartyRedirectResDto {
    @JsonProperty("redirect_url")
    private String redirectUrl;

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(final String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }
}
