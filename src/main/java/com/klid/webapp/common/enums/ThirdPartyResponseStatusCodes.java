package com.klid.webapp.common.enums;

import com.klid.webapp.common.CustomException;

public enum ThirdPartyResponseStatusCodes {
    SUCCESS(0, "성공", "작업을 성공했습니다."),
    INVALID_IP(-1, "접속IP 정보가 불일치", "접속하신 IP가 올바르지 않습니다."),
    INACTIVE_ACCOUNT(-2, "장기 미사용으로 비활성화 된 계정", "장기간 미사용으로 계정이 비활성화되었습니다."),
    PENDING_APPROVAL(-3, "회원가입 승인 대기중", "회원가입 승인이 필요합니다."),
    INVALID_LOGIN(-4, "로그인 정보가 올바르지 않음", "아이디 또는 비밀번호가 올바르지 않습니다."),
    PASSWORD_ATTEMPTS_EXCEEDED(-5, "비밀번호 오류 횟수가 5회를 초과", "비밀번호 오류 횟수가 초과되었습니다."),
    INVALID_PERIOD(-6, "사용 가능 기간이 아님", "현재는 사용 가능한 기간이 아닙니다."),
    MISSING_PARAMETER(-10, "필수 파라미터 누락", "필수 입력값(ID/PW 등)이 누락되었습니다."),
    INVALID_DATE_FORMAT(-11, "잘못된 날짜 형식", "날짜 형식이 올바르지 않습니다."),
    USER_NOT_FOUND(-12, "사용자 ID 없음", "사용자 ID가 존재하지 않습니다."),
    PASSWORD_MISMATCH(-13, "비밀번호 불일치", "비밀번호가 일치하지 않습니다."),
    UNSUPPORTED_API(-14, "지원하지 않는 API 타입", "해당 API는 지원하지 않습니다."),
    INVALID_USER_TYPE(-15, "잘못된 user_type", "잘못된 사용자 유형입니다."),
    DATABASE_UPDATE_FAILED(-16, "데이터베이스 업데이트 실패", "정보 수정을 실패했습니다."),
    INVALIDATED_EMAIL_FORMAT(-17, "잘못된 이메일 형식", "이메일 형식이 올바르지 않습니다."),
    INVALIDATED_CODE(-18, "잘못된 인증코드 형식 또는 이메일 미등록", "잘못된 인증코드 형식 또는 미등록된 이메일입니다."),
    SEND_MAIL_FAILED(-19, "이메일 발송 실패", "이메일 발송을 실패했습니다."),
    DUPLICATED_USER(-20, "중복 사용자", "사용자 계정이 두개 이상입니다. 관리자에게 문의하시기 바랍니다."),
    SYSTEM_ERROR(-99, "시스템 오류, 쿼리 오류 등 예외 발생", "시스템 오류가 발생했습니다."),
    BAD_REQUEST(-400, "잘못 된 요청", "요청 값이 잘못되었습니다."),
    MISSING_API_KEY(-401, "API_KEY 또는 API_SECRET 헤더가 누락", "인증 정보가 누락되었습니다."),
    RESOURCE_NOT_FOUND(-404, "레소스(데이터) 없음", "요청하신 데이터를 찾을 수 없습니다."),
    USER_INFO_STATUS_CHECK(-405, "사용자 계정 상태 확인", "사용자 계정 상태를 확인해주세요"),
    SERVER_ERROR(-500, "서버 오류", "서버 오류가 발생했습니다.");

    private final int code;
    private final String systemMessage;
    private final String userMessage;

    ThirdPartyResponseStatusCodes(int code, String systemMessage, String userMessage) {
        this.code = code;
        this.systemMessage = systemMessage;
        this.userMessage = userMessage;
    }

    public int getCode() {
        return code;
    }

    public String getSystemMessage() {
        return systemMessage;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public static ThirdPartyResponseStatusCodes fromCode(int code) {
        for (ThirdPartyResponseStatusCodes rc : values()) {
            if (rc.code == code) {
                return rc;
            }
        }
        throw new CustomException(ThirdPartyResponseStatusCodes.SERVER_ERROR.getUserMessage() + "." + code);
    }
}
