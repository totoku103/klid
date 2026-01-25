package com.klid.webapp.main.env.userManagementHistory.dto;

import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.enums.UserManagementProcessTypes;

public class RequestCancelReqDto {
    private final UserManagementProcessTypes userManagementProcessTypes = UserManagementProcessTypes.CANCELLATION_REQUEST;
    private final Integer requestUserSeq = SessionManager.getUser().getSeq();
    private final Integer requestInstCd = SessionManager.getUser().getInstCd();

    private Integer commUserRequestSeq;
    private String requestReason;

    public UserManagementProcessTypes getUserManagementProcessTypes() {
        return userManagementProcessTypes;
    }

    public Integer getRequestUserSeq() {
        return requestUserSeq;
    }

    public Integer getRequestInstCd() {
        return requestInstCd;
    }

    public Integer getCommUserRequestSeq() {
        return commUserRequestSeq;
    }

    public void setCommUserRequestSeq(final Integer commUserRequestSeq) {
        this.commUserRequestSeq = commUserRequestSeq;
    }

    public String getRequestReason() {
        return requestReason;
    }

    public void setRequestReason(final String requestReason) {
        this.requestReason = requestReason;
    }
}
