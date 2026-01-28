package com.klid.webapp.common.properties;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.ThirdPartyPropertyCrypto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@DependsOn(value = {"thirdPartyPropertyCrypto"})
@Slf4j
public class ThirdPartyCommonProperty {

    private final ThirdPartyPropertyCrypto thirdPartyPropertyCrypto;

    public ThirdPartyCommonProperty(ThirdPartyPropertyCrypto thirdPartyPropertyCrypto) {
        this.thirdPartyPropertyCrypto = thirdPartyPropertyCrypto;
    }

    @Value("${app.third-party.header.api.key}")
    private String apiKey;

    @Value("${app.third-party.header.api.secret}")
    private String apiSecret;

    @Value("${app.third-party.seed.cbc.key}")
    private String seedCbcKey;

    @Value("${app.third-party.hmac.key}")
    private String hMacKey;

    @PostConstruct
    public void print() {
        log.info("--- ThirdPartyCommonSecrets ---");
        log.info("API KEY: " + getApiKey());
        log.info("API SECRET(MASK): " + mask(getApiSecret()));
        log.info("SEED CBC KEY(MASK): " + mask(getSeedCbcKey()));
        log.info("HMAC KEY(MASK): " + mask(getHMacKey()));
    }

    private String mask(String v) {
        if (v == null) return null;
        return v.length() <= 6 ? "***" : v.substring(0, 3) + "***" + v.substring(v.length() - 3);
    }

    public String getApiKey() {
        return apiKey;
    }

    public String getApiSecret() {
        return thirdPartyPropertyCrypto.decrypt(apiSecret);
    }

    public String getSeedCbcKey() {
        return thirdPartyPropertyCrypto.decrypt(seedCbcKey);
    }

    public String getHMacKey() {
        return thirdPartyPropertyCrypto.decrypt(hMacKey);
    }
}
