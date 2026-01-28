package com.klid.common;

import org.apache.commons.codec.binary.Base32;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;
import java.util.*;

@Slf4j
@Component
public class OtpApi {
    public static String generate(String name, String host) {
        byte[] buffer = new byte[5 + 5 * 5];
        new Random().nextBytes(buffer);
        Base32 codec = new Base32();
        byte[] secretKey = Arrays.copyOf(buffer, 10);
        byte[] bEncodedKey = codec.encode(secretKey);
        String encodedKey = new String(bEncodedKey);
        log.debug("OTP key generated for: {}", name);
        return encodedKey;
    }

    public static boolean checkCode(String userCode, String otpkey) {
        long otpnum = Integer.parseInt(userCode); // OTP 앱에 표시되는 6자리 숫자
        long wave = new Date().getTime() / 30000; // OTP의 주기(초)
        boolean result = false;
        try {
            Base32 codec = new Base32();
            byte[] decodedKey = codec.decode(otpkey);
            int window = 3;
            for (int i = -window; i <= window; ++i) {
                long hash = verify_code(decodedKey, wave + i);
                log.info("otp code: " + hash);
                if (hash == otpnum) result = true; }
        } catch (InvalidKeyException | NoSuchAlgorithmException e) { e.printStackTrace(); }
        return result;
    }

    private static int verify_code(byte[] key, long t) throws NoSuchAlgorithmException, InvalidKeyException {
        byte[] data = new byte[8];
        long value = t;
        for (int i = 8; i-- > 0; value >>>= 8) {
            data[i] = (byte) value;
        }
        SecretKeySpec signKey = new SecretKeySpec(key, "HmacSHA1");
        Mac mac = Mac.getInstance("HmacSHA1"); mac.init(signKey);
        byte[] hash = mac.doFinal(data);
        int offset = hash[20 - 1] & 0xF; // We're using a long because Java hasn't got unsigned int.
        long truncatedHash = 0;
        for (int i = 0; i < 4; ++i) {
            truncatedHash <<= 8; // We are dealing with signed bytes: // we just keep the first byte.
            truncatedHash |= (hash[offset + i] & 0xFF);
        }
        truncatedHash &= 0x7FFFFFFF;
        truncatedHash %= 1000000;
        return (int) truncatedHash;

    }
}
