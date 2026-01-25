package com.klid.webapp.common.enums;

public enum UserManagementRequestTypes {
    REGISTRATION_REQUEST("등록 요청"),
    DELETION_REQUEST("삭제 요청"),
    MODIFICATION_REQUEST("수정 요청"),
    PASSWORD_RESET_REQUEST("비밀번호 초기화 요청"),
    OTP_SECRET_KEY_RESET_REQUEST("OTP 초기화 요청"),
    GPKI_SERIAL_NO_RESET_REQUEST("인증서 초기화 요청"),
    ACCOUNT_LOCK_RESET_REQUEST("계정 잠김 초기화 요청"),
    INACTIVE_RESET_REQUEST("장기 미접속자 초기화 요청");

    private final String description;

    UserManagementRequestTypes(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
