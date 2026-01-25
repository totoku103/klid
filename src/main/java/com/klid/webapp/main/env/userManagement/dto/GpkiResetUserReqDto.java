package com.klid.webapp.main.env.userManagement.dto;

import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.enums.UserManagementRequestTypes;
import org.apache.commons.lang3.StringUtils;

public class GpkiResetUserReqDto {
    private final UserManagementRequestTypes requestTypes = UserManagementRequestTypes.GPKI_SERIAL_NO_RESET_REQUEST;
    private final Integer requestUserSeq = SessionManager.getUser().getSeq();
    private final Integer requestInstCd = SessionManager.getUser().getInstCd();

    private String requestReason;
    private Integer commUserSeq;

    public UserManagementRequestTypes getRequestTypes() {
        return requestTypes;
    }

    public Integer getRequestUserSeq() {
        return requestUserSeq;
    }

    public String getRequestReason() {
        return requestReason;
    }

    public void setRequestReason(final String requestReason) {
        this.requestReason = requestReason;
    }

    public Integer getCommUserSeq() {
        return commUserSeq;
    }

    public void setCommUserSeq(final Integer commUserSeq) {
        this.commUserSeq = commUserSeq;
    }

    public Integer getRequestInstCd() {
        return requestInstCd;
    }

    @Override
    public String toString() {
        return "GpkiResetUserReqDto{" +
                "requestTypes=" + requestTypes +
                ", requestUserSeq=" + requestUserSeq +
                ", requestReason='" + requestReason + '\'' +
                ", commUserSeq=" + commUserSeq +
                '}';
    }

    public void validate() {
        if (commUserSeq == null || commUserSeq == 0) throw new CustomException("사용자 정보가 없습니다.");
        if (StringUtils.isBlank(getRequestReason())) throw new CustomException("사유를 입력하세요.");
    }
}
