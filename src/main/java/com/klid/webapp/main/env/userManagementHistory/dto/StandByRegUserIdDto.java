package com.klid.webapp.main.env.userManagementHistory.dto;

import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.common.enums.UserManagementRequestTypes;

public class StandByRegUserIdDto {
    private String seq;
    private String userId;
    private UserManagementRequestTypes requestType;
    private UserManagementProcessTypes latestProcessState;
    private String childSeq;

    public String getSeq() {
        return seq;
    }

    public void setSeq(final String seq) {
        this.seq = seq;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public UserManagementRequestTypes getRequestType() {
        return requestType;
    }

    public void setRequestType(final UserManagementRequestTypes requestType) {
        this.requestType = requestType;
    }

    public UserManagementProcessTypes getLatestProcessState() {
        return latestProcessState;
    }

    public void setLatestProcessState(final UserManagementProcessTypes latestProcessState) {
        this.latestProcessState = latestProcessState;
    }

    public String getChildSeq() {
        return childSeq;
    }

    public void setChildSeq(final String childSeq) {
        this.childSeq = childSeq;
    }
}
