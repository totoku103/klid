package com.klid.common.util;

import com.klid.webapp.common.dto.UserDto;
import org.apache.commons.lang3.StringUtils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Base64;

public class RedirectTokenUtil {
    private static final SecureRandom RNG = new SecureRandom();

    private static String b64Url(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public static String getSecretKey(UserDto userDto) {
        return String.format("%s-%s-%s", userDto.getUserId(), userDto.getUserName(), userDto.getAuthGrpName());
    }

    public static String generateNonce(int bytes) {
        final byte[] buf = new byte[bytes];
        RNG.nextBytes(buf);
        return b64Url(buf);
    }

    private static String hmacSha256Base64Url(String secret, String data) {
        try {
            final Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return b64Url(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new RuntimeException("HMAC error", e);
        }
    }

    public static Timestamp getExpiredTime(long ttlSecond) {
        return Timestamp.from(Instant.now().plusSeconds(ttlSecond));
    }

    public static String createToken(String secret, Timestamp expiredTime) {
        final String nonce = generateNonce(32);                      // 32 bytes 무작위
        final String payload = nonce + "." + expiredTime.getTime();
        final String sig = hmacSha256Base64Url(secret, payload);
        return payload + "." + sig;
    }

    public static boolean verifyToken(String secret, String token) {
        if (StringUtils.isBlank(token)) return false;
        final String[] parts = token.split("\\.");
        if (parts.length != 3) return false;

        final String nonce = parts[0];
        final String expStr = parts[1];
        final String sig = parts[2];

        final long now = Instant.now().getEpochSecond();
        long exp;
        try {
            exp = Long.parseLong(expStr);
        } catch (NumberFormatException e) {
            return false;
        }
        // 만료
        if (now > exp) return false;

        // 서명 재계산 및 상수시간 비교
        final String payload = nonce + "." + expStr;
        final String expectedSig = hmacSha256Base64Url(secret, payload);
        return MessageDigest.isEqual(
                expectedSig.getBytes(StandardCharsets.UTF_8),
                sig.getBytes(StandardCharsets.UTF_8)
        );
    }

    public static String buildRedirectUrl(String baseUrl, String token) throws UnsupportedEncodingException {
        final String encoded = URLEncoder.encode(token, StandardCharsets.UTF_8.name());
        return baseUrl + "?token=" + encoded;
    }

}
