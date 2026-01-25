package com.klid.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.SecureRandom;

public class RandomUtils {

    private final static Logger log = LoggerFactory.getLogger(RandomUtils.class);

    public static String getRandom6Digit() {
        final SecureRandom secureRandom = new SecureRandom();
        final int randomInteger = secureRandom.nextInt(999999);
        final String digitString = String.format("%06d", randomInteger);
        log.debug("Random 6Digit: " + digitString);
        return digitString;
    }
}
