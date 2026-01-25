package com.klid.webapp.common.enums;

import java.util.Arrays;

public enum ThirdPartyUserTypes {
    VMS("vms"),
    CTSS("ctss");

    final String value;

    ThirdPartyUserTypes(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ThirdPartyUserTypes fromValue(String value) {
        return Arrays.stream(ThirdPartyUserTypes.values()).filter(userType -> userType.getValue().equals(value)).findFirst().orElse(null);
    }
}
