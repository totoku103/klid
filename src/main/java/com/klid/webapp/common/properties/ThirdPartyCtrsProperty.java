package com.klid.webapp.common.properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class ThirdPartyCtrsProperty {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Value("${app.ctrs.url.host}")
    private String urlHost;

    @PostConstruct
    public void print() {
        log.info("--- ThirdPartyCtrsProperties ---");
        log.info("CTRS URL HOST: " + getUrlHost());
    }

    public String getUrlHost() {
        return urlHost;
    }
}
