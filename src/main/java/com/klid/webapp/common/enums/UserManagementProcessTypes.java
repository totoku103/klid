package com.klid.webapp.common.enums;

public enum UserManagementProcessTypes {
    REQUEST("요청"),
    CANCELLATION_REQUEST("요청 취소"),
    REVIEWING("검토"),
    APPROVAL("승인"),
    REJECTION("반려");

    private final String description;

    UserManagementProcessTypes(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
