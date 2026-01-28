package com.klid.webapp.common.properties;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@Slf4j
public class ThirdPartyCtrsProperty {


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
