package com.klid.webapp.main.env.userManagementHistory.dto;

import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.common.enums.UserManagementRequestTypes;

public class HistoryGridResDto {
    private String commUserRequestSeq;
    private String latestCommUserRequestSeq;
    private String originUserSeq;
    private int originUserInstCode;
    private String originUserInstName;
    private String originUserId;
    private String originUserName;

    private String requestUserSeq;
    private String requestUserName;
    private int requestUserInstCode;
    private String requestUserInstName;
    private UserManagementRequestTypes requestType;
    private String requestReason;
    private String requestRegDt;
    private UserManagementProcessTypes processState;
    private String parentSeq;
    private String approveUserSeq;
    private String approveUserName;
    private String approveUserInstCode;
    private String approveUserInstName;
    private String approveReason;
    private String approveRegDt;

    public String getCommUserRequestSeq() {
        return commUserRequestSeq;
    }

    public void setCommUserRequestSeq(final String commUserRequestSeq) {
        this.commUserRequestSeq = commUserRequestSeq;
    }

    public String getLatestCommUserRequestSeq() {
        return latestCommUserRequestSeq;
    }

    public void setLatestCommUserRequestSeq(final String latestCommUserRequestSeq) {
        this.latestCommUserRequestSeq = latestCommUserRequestSeq;
    }

    public String getOriginUserSeq() {
        return originUserSeq;
    }

    public void setOriginUserSeq(final String originUserSeq) {
        this.originUserSeq = originUserSeq;
    }

    public int getOriginUserInstCode() {
        return originUserInstCode;
    }

    public void setOriginUserInstCode(final int originUserInstCode) {
        this.originUserInstCode = originUserInstCode;
    }

    public String getOriginUserInstName() {
        return originUserInstName;
    }

    public void setOriginUserInstName(final String originUserInstName) {
        this.originUserInstName = originUserInstName;
    }

    public String getOriginUserId() {
        return originUserId;
    }

    public void setOriginUserId(final String originUserId) {
        this.originUserId = originUserId;
    }

    public String getOriginUserName() {
        return originUserName;
    }

    public void setOriginUserName(final String originUserName) {
        this.originUserName = originUserName;
    }

    public String getRequestUserSeq() {
        return requestUserSeq;
    }

    public void setRequestUserSeq(final String requestUserSeq) {
        this.requestUserSeq = requestUserSeq;
    }

    public String getRequestUserName() {
        return requestUserName;
    }

    public void setRequestUserName(final String requestUserName) {
        this.requestUserName = requestUserName;
    }

    public int getRequestUserInstCode() {
        return requestUserInstCode;
    }

    public void setRequestUserInstCode(final int requestUserInstCode) {
        this.requestUserInstCode = requestUserInstCode;
    }

    public String getRequestUserInstName() {
        return requestUserInstName;
    }

    public void setRequestUserInstName(final String requestUserInstName) {
        this.requestUserInstName = requestUserInstName;
    }

    public UserManagementRequestTypes getRequestType() {
        return requestType;
    }

    public void setRequestType(final UserManagementRequestTypes requestType) {
        this.requestType = requestType;
    }

    public String getRequestTypeMessage() {
        return this.requestType.getDescription();
    }

    public String getRequestReason() {
        return requestReason;
    }

    public void setRequestReason(final String requestReason) {
        this.requestReason = requestReason;
    }

    public String getRequestRegDt() {
        return requestRegDt;
    }

    public void setRequestRegDt(final String requestRegDt) {
        this.requestRegDt = requestRegDt;
    }

    public UserManagementProcessTypes getProcessState() {
        return processState;
    }

    public void setProcessState(final UserManagementProcessTypes processState) {
        this.processState = processState;
    }

    public String getProcessStateMessage() {
        return this.processState.getDescription();
    }

    public String getParentSeq() {
        return parentSeq;
    }

    public void setParentSeq(final String parentSeq) {
        this.parentSeq = parentSeq;
    }

    public String getApproveUserSeq() {
        return approveUserSeq;
    }

    public void setApproveUserSeq(final String approveUserSeq) {
        this.approveUserSeq = approveUserSeq;
    }

    public String getApproveUserName() {
        return approveUserName;
    }

    public void setApproveUserName(final String approveUserName) {
        this.approveUserName = approveUserName;
    }

    public String getApproveUserInstCode() {
        return approveUserInstCode;
    }

    public void setApproveUserInstCode(final String approveUserInstCode) {
        this.approveUserInstCode = approveUserInstCode;
    }

    public String getApproveUserInstName() {
        return approveUserInstName;
    }

    public void setApproveUserInstName(final String approveUserInstName) {
        this.approveUserInstName = approveUserInstName;
    }

    public String getApproveReason() {
        return approveReason;
    }

    public void setApproveReason(final String approveReason) {
        this.approveReason = approveReason;
    }

    public String getApproveRegDt() {
        return approveRegDt;
    }

    public void setApproveRegDt(final String approveRegDt) {
        this.approveRegDt = approveRegDt;
    }
}
