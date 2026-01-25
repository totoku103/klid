package com.klid.webapp.main.env.userManagementHistory.dto;

import com.klid.webapp.common.enums.UserManagementProcessTypes;

public class LatestCommUserRequestProcessStateDto {
    private Integer rootSeq;
    private Integer latestSeq;
    private UserManagementProcessTypes latestProcessState;

    public Integer getRootSeq() {
        return rootSeq;
    }

    public void setRootSeq(final Integer rootSeq) {
        this.rootSeq = rootSeq;
    }

    public Integer getLatestSeq() {
        return latestSeq;
    }

    public void setLatestSeq(final Integer latestSeq) {
        this.latestSeq = latestSeq;
    }

    public UserManagementProcessTypes getLatestProcessState() {
        return latestProcessState;
    }

    public void setLatestProcessState(final UserManagementProcessTypes latestProcessState) {
        this.latestProcessState = latestProcessState;
    }
}
