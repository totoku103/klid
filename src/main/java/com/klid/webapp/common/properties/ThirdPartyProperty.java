package com.klid.webapp.common.properties;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

@Component
@DependsOn(value = {"thirdPartyCommonProperty", "thirdPartyVmsProperty", "thirdPartyCtssProperty"})
@Slf4j
public class ThirdPartyProperty {

    private final ThirdPartyCommonProperty commonProperty;
    private final ThirdPartyCtrsProperty ctrsProperty;
    private final ThirdPartyVmsProperty vmsProperty;
    private final ThirdPartyCtssProperty ctssProperty;

    public ThirdPartyProperty(final ThirdPartyCommonProperty commonProperty,
                              final ThirdPartyCtrsProperty ctrsProperty,
                              final ThirdPartyVmsProperty vmsProperty,
                              final ThirdPartyCtssProperty ctssProperty) {
        this.commonProperty = commonProperty;
        this.ctrsProperty = ctrsProperty;
        this.vmsProperty = vmsProperty;
        this.ctssProperty = ctssProperty;
        log.info(this.getClass().getName() + " 파일 로딩 완료.");
    }

    public String getApiKey() {
        return commonProperty.getApiKey();
    }

    public String getApiSecret() {
        return commonProperty.getApiSecret();
    }

    public String getSeedCbcKey() {
        return commonProperty.getSeedCbcKey();
    }

    public String getHmacKey() {
        return commonProperty.getHMacKey();
    }

    public String getCtrsUrlHost() {
        return ctrsProperty.getUrlHost();
    }

    public String getVmsUrlHost() {
        return vmsProperty.getUrlHost();
    }

    public String getVmsUrlRest() {
        return vmsProperty.getUrlRest();
    }

    public String getVmsUrlLinkPolicy() {
        return vmsProperty.getUrlLinkPolicy();
    }

    public String getVmsUrlRedirectSignUp() {
        return vmsProperty.getUrlRedirectSignUp();
    }

    public String getCtssUrlHost() {
        return ctssProperty.getUrlHost();
    }

    public String getCtssUrlRest() {
        return ctssProperty.getUrlRest();
    }

    public String getCtssUrlLinkPolicy() {
        return ctssProperty.getUrlLinkPolicy();
    }

    public String getCtssUrlRedirectSignUp() {
        return ctssProperty.getUrlRedirectSignUp();
    }
}
