package com.klid.common.util;

import lombok.extern.slf4j.Slf4j;

import java.security.SecureRandom;

@Slf4j
public class RandomUtils {

    public static String getRandom6Digit() {
        final SecureRandom secureRandom = new SecureRandom();
        final int randomInteger = secureRandom.nextInt(999999);
        final String digitString = String.format("%06d", randomInteger);
        log.debug("Random 6Digit: " + digitString);
        return digitString;
    }
}
