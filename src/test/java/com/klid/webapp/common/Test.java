package com.klid.webapp.common;

import java.security.SecureRandom;

public class Test {

    @org.junit.Test
    public void test() {
        for (int i = 0; i < 100; i++) {
            final SecureRandom secureRandom = new SecureRandom();
            final int randomInteger = secureRandom.nextInt(999999);
            final String digitString = String.format("%06d", randomInteger);
            System.out.println(digitString);
        }
    }
}
