package com.klid.webapp.common.properties;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@Slf4j
public class ThirdPartyCtssProperty {

    @Value("${app.ctss.url.host}")
    private String urlHost;

    @Value("${app.ctss.url.rest}")
    private String urlRest;

    @Value("${app.ctss.url.link.policy}")
    private String urlLinkPolicy;

    @Value("${app.ctss.url.redirect.signup}")
    private String urlRedirectSignUp;

    @PostConstruct
    public void print() {
        log.info("--- ThirdPartyCtssProperties ---");
        log.info("CTSS URL HOST: " + getUrlHost());
        log.info("CTSS URL REST: " + getUrlRest());
        log.info("CTSS URL LINK POLICY: " + getUrlLinkPolicy());
        log.info("CTSS URL REDIRECT SIGN UP: " + getUrlRedirectSignUp());
    }

    public String getUrlHost() {
        return urlHost;
    }

    public String getUrlRest() {
        return getUrlHost() + urlRest;
    }

    public String getUrlLinkPolicy() {
        return getUrlHost() + urlLinkPolicy;
    }

    public String getUrlRedirectSignUp() {
        return getUrlHost() + urlRedirectSignUp;
    }
}
