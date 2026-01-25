package com.klid.webapp.common.enums;

public enum SessionAttributeTypes {
    INTEGRATION_LOGIN_INFO("integrationLoginInfo"),
    IS_AUTHENTICATE_PRIMARY("isAuthenticatePrimary"),
    IS_AUTHENTICATE_SECOND("isAuthenticateSecond"),
    THIRD_PARTY_REDIRECT_CONNECT("thirdPartyRedirectConnect"),
    OTP_SECRET_KEY("otpSecretKey"),
    OTP_SECRET_KEYS("otpSecretKeys"),
    GPKI_SERIAL_NUMBER("gpkiSerialNumber"),
    EMAIL_RANDOM_DIGIT("emailRandomDigit"),
    USER_LAST_ACTION("userLastAction"),
    THIRD_PARTY_REDIRECT_URL("thirdPartyRedirectUrl");

    private final String value;

    SessionAttributeTypes(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
