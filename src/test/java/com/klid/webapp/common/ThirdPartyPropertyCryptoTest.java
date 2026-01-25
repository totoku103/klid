package com.klid.webapp.common;

import org.junit.Test;

public class ThirdPartyPropertyCryptoTest {

    @Test
    public void test() {
        final ThirdPartyPropertyCrypto thirdPartyPropertyCrypto = new ThirdPartyPropertyCrypto();
        final String seedKey = "9b8796492bfb18443c94f3e8fc193da2";
        final String seedKeyEncrypt = thirdPartyPropertyCrypto.encrypt(seedKey);

        System.out.println(seedKey + " >>>> " + seedKeyEncrypt);
        final String seedKeyDecrypt = thirdPartyPropertyCrypto.decrypt(seedKeyEncrypt);
        System.out.println(seedKeyEncrypt + " >>>> " + seedKeyDecrypt);


        final String hmac = "318d136afe9edd9aa5a3902539480d6f37efa67146ec83c6e146bf99dce78025";
        final String hmacEncrypt = thirdPartyPropertyCrypto.encrypt(hmac);

        System.out.println(hmac + " >>>> " + hmacEncrypt);
        final String hmacDecrypt = thirdPartyPropertyCrypto.decrypt(hmacEncrypt);
        System.out.println(hmacEncrypt + " >>>> " + hmacDecrypt);
    }

    @Test
    public void headerKey () {
        final String message = "A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6";
        final ThirdPartyPropertyCrypto thirdPartyPropertyCrypto = new ThirdPartyPropertyCrypto();
        final String encrypt = thirdPartyPropertyCrypto.encrypt(message);
        System.out.println(encrypt);
    }


}