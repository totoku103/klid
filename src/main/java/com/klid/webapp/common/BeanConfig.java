package com.klid.webapp.common;

import com.klid.webapp.common.service.ThirdPartyCryptoService;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import me.totoku103.crypto.core.utils.ByteUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Autowired
    ThirdPartyProperty thirdPartyProperty;

    @Bean
    public ThirdPartyCryptoService thirdPartyCryptoService() {
        final byte[] seedCbcKey = ByteUtils.fromHexString(thirdPartyProperty.getSeedCbcKey());
        final byte[] hMacKey = ByteUtils.fromHexString(thirdPartyProperty.getHmacKey());

        return new ThirdPartyCryptoService(seedCbcKey, hMacKey);
    }
}
