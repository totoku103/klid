package com.klid.webapp.common.enums;

public enum ThirdPartySystemTypes {
    CTRS("ctrs"),
    VMS("vms"),
    CTSS("ctss");

    private final String value;

    ThirdPartySystemTypes(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
