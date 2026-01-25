package com.klid.webapp.common;

import me.totoku103.crypto.core.utils.ByteUtils;
import me.totoku103.crypto.enums.SeedCbcTransformations;
import me.totoku103.crypto.java.seed.SeedCbc;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * third-party-setting.properties 에 저장된 값을 암호화 하는 컴포넌트
 * 자체적으로만 사용한다.
 */
@Component
public class ThirdPartyPropertyCrypto {
    private final String seedKeyHex = "a7ded775d6a52ade51ff996f77b2e9f4";
    private final byte[] key = ByteUtils.fromHexString(seedKeyHex);

    private final String ivHex = "82726ba983d8b87801c3ad666211f02c";
    private final byte[] iv = ByteUtils.fromHexString(ivHex);

    private final SeedCbc seedCbc = new SeedCbc(SeedCbcTransformations.SEED_CBC_PKCS7_PADDING);


    public String encrypt(String plainText) {
        final byte[] encrypt = seedCbc.encrypt(plainText.getBytes(StandardCharsets.UTF_8), key, iv);
        return Base64.getEncoder().encodeToString(encrypt);
    }

    public String decrypt(String encryptBase64Text) {
        final byte[] decode = Base64.getDecoder().decode(encryptBase64Text);
        final byte[] decrypt = seedCbc.decrypt(decode, key, iv);
        return new String(decrypt, StandardCharsets.UTF_8);
    }
}
