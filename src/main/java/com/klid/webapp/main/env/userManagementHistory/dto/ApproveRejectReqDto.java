package com.klid.webapp.main.env.userManagementHistory.dto;

public class ApproveRejectReqDto {
    private Integer commUserRequestSeq;
    private String approveReason;
    private String approveType; // "APPROVE" or "REJECT"

    public Integer getCommUserRequestSeq() {
        return commUserRequestSeq;
    }

    public void setCommUserRequestSeq(final Integer commUserRequestSeq) {
        this.commUserRequestSeq = commUserRequestSeq;
    }

    public String getApproveReason() {
        return approveReason;
    }

    public void setApproveReason(final String approveReason) {
        this.approveReason = approveReason;
    }

    public String getApproveType() {
        return approveType;
    }

    public void setApproveType(final String approveType) {
        this.approveType = approveType;
    }
}