package com.klid.webapp.common.properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class ThirdPartyVmsProperty {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Value("${app.vms.url.host}")
    private String urlHost;

    @Value("${app.vms.url.rest}")
    private String urlRest;

    @Value("${app.vms.url.link.policy}")
    private String urlLinkPolicy;

    @Value("${app.vms.url.redirect.signup}")
    private String urlRedirectSignUp;

    @PostConstruct
    public void print() {
        log.info("--- ThirdPartyVmsProperties ---");
        log.info("VMS URL HOST: " + getUrlHost());
        log.info("VMS URL REST: " + getUrlRest());
        log.info("VMS URL LINK POLICY: " + getUrlLinkPolicy());
        log.info("VMS URL REDIRECT SIGN UP: " + getUrlRedirectSignUp());
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
